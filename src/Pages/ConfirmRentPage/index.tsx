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

type ConfirmRentPageParams = {
  lockersNumString: string
}

function ConfirmRentPage() {
  const { user, setUser } = useUser()
  const { locker } = useLocker()
  const params = useParams<ConfirmRentPageParams>()
  const navigate = useNavigate()

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
    <div id='confirm-rent-page'>
      <Toaster />
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
                  <img ref={selectedLockerImgRef} src={LockerImage} alt='' />
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
                  <p>R$200,00</p>
                </div>
                <div className='desconto'>
                  <p>Desconto APM</p>
                  <p>(50%) - R$100,00</p>
                </div>
              </div>
              <div className='bottom-section'>
                <div className='total'>
                  <p>Total</p>
                  <p>R$100,00</p>
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
