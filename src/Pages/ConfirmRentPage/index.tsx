import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { Loading } from '../../components/Loading/Loading'

import { useLocker } from '../../hooks/useLocker'
import { useUser } from '../../hooks/useUser'

import LockerImage from '../../assets/LockerImage.png'

import api from '../../api'

import './styles.scss'
import { useDarkTheme } from '../../hooks/useDarkTheme'

type ConfirmRentPageParams = {
  lockersNumString: string
}

function ConfirmRentPage() {
  const { user, setUser } = useUser()
  const { locker } = useLocker()
  const { darkTheme } = useDarkTheme()
  const params = useParams<ConfirmRentPageParams>()
  const navigate = useNavigate()
  const regularPrice = 200
  const discount = 100

  const [loading, setLoading] = useState(false)

  const selectedLockerImgRef = useRef<HTMLImageElement>(null)
  const colorSpanRef = useRef<HTMLSpanElement>(null)

  if (params.lockersNumString == undefined) {
    return <div>404</div>
  }

  const lockerNumber = parseInt(params.lockersNumString)

  if (isNaN(lockerNumber)) {
    return <div>404</div>
  }

  function handleLockerRent() {
    const requestBodyStudent = {
      ra: user.ra,
      lockerNumber: lockerNumber,
    }

    const requestBodyLocker = {
      lockerNumber: lockerNumber,
      isRented: 1,
    }

    setLoading(true)

    api.post('/lockers/set-is-rented', requestBodyLocker).catch(err => {
      toast.error(err.response.data.erro)
    })

    api
      .post('/students/update-locker-number', requestBodyStudent, {
        withCredentials: true,
      })
      .then(response => {
        setUser(response.data)
        toast.success('Armário alugado com sucesso')
        setLoading(false)
        setTimeout(() => {
          toast.dismiss()
          navigate('/')
        }, 1500)
      })
      .catch(err => {
        toast.error(err.response.data.erro)
      })
  }

  useEffect(() => {
    if (locker != null) {
      selectedLockerImgRef.current!.style.backgroundColor = locker.section.color

      colorSpanRef.current!.style.backgroundColor = locker.section.color
    }
  }, [])

  function transformHexToPlainText(hex: string) {
    if (hex == '#FDFF97') {
      return 'Amarelo'
    } else if (hex == '#FF7B7B') {
      return 'Vermelho'
    } else if (hex == '#92B7FF') {
      return 'Azul'
    } else if (hex == '#A6FFEA') {
      return 'Verde Água'
    }
  }

  return (
    <div id='confirm-rent-page' className={darkTheme ? 'dark' : ''}>
      <Toaster
        toastOptions={{
          style: {
            background: darkTheme ? '#333' : '#fff',
            color: darkTheme ? '#fff' : '#000',
          },
        }}
      />
      <NavBar />
      <main>
        <div className='title-container'>
          <p className='page-title'>Alugue um Armário</p>
          <p className='page-subtitle'>
            Revise seu pedido e realize o pagamento
          </p>
        </div>
        {locker ? (
          <div className='content'>
            <div className='general-info'>
              <h2>Pedido</h2>
              <div className='general-info-body'>
                <div className='lockers-info'>
                  <div className='img-container' ref={selectedLockerImgRef}>
                    <img src={LockerImage} alt='' />
                  </div>
                  <div className='lockers-info-text'>
                    <h3>Armário {locker.number}</h3>
                    <div className='info'>
                      <p>
                        Andar:{' '}
                        <span>
                          {locker.FK_section_id <= 5 ? 'Segundo' : 'Primeiro'}
                        </span>
                      </p>
                      <p>
                        Cor:{' '}
                        <span className='color-span'>
                          {transformHexToPlainText(locker!.section.color)}
                          <span
                            className='color-span-content'
                            ref={colorSpanRef}
                          ></span>
                        </span>
                      </p>
                      <p>
                        Sala na Esquerda:{'  '}
                        <span>{locker.section.left_room}</span>
                      </p>
                      <p>
                        Sala na Direita:{'  '}
                        <span>{locker.section.right_room}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className='price'>R$200,00</p>
              </div>
            </div>
            <div className='prices-info'>
              <div className='top-section'>
                <div className='subtotal'>
                  <p>Subtotal</p>
                  <p>R${regularPrice},00</p>
                </div>
                <div className='discount'>
                  <p>Desconto APM</p>
                  {user.apm[0]?.status > 0 ? (
                    <p>
                      ({(discount * 100) / regularPrice}%) - R$
                      {regularPrice - discount},00
                    </p>
                  ) : (
                    <p>(0%) - R$0,00</p>
                  )}
                </div>
              </div>
              <div className='bottom-section'>
                <div className='total'>
                  <p>Total</p>
                  <p>
                    R$
                    {user.apm[0]?.status > 0
                      ? regularPrice - discount
                      : regularPrice}
                    ,00
                  </p>
                </div>
                <button
                  onClick={handleLockerRent}
                  className={loading ? 'loading' : ''}
                >
                  {loading ? <Loading /> : 'Finalizar Compra'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div> loading...</div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ConfirmRentPage
