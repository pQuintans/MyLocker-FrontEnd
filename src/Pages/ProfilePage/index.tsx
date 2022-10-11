import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import Modal from '../../components/Modal/index'

import { Locker } from '../../contexts/LockerContext'
import { useUser } from '../../hooks/useUser'

import NoLockersFoundedImg from '../../assets/NoLockersFounded.png'
import LockerImg from '../../assets/LockerImage.png'
import DefaultProfilePic from '../../assets/DefaultProfilePicture.jpg'
import DefaultProfilePicDarkMode from '../../assets/DefaultProfilePictureDarkMode.jpg'

import api from '../../api'

import './styles.scss'
import { Loading } from '../../components/Loading/Loading'
import { useDarkTheme } from '../../hooks/useDarkTheme'

function ProfilePage() {
  const { user, setUser } = useUser()
  const { darkTheme } = useDarkTheme()

  const [changeProfilePictureModalIsOpen, setChangeProfilePictureModalIsOpen] =
    useState(false)
  const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] =
    useState(false)
  const [newProfilePicture, setNewProfilePicture] = useState('')
  const [studentLocker, setStudentLocker] = useState<Locker | null>(null)
  const [selectedImage, setSelectedImage] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [loadingLocker, setLoadingLocker] = useState(true)

  const oldPasswordInputRef = useRef<HTMLInputElement>(null)
  const newPasswordInputRef = useRef<HTMLInputElement>(null)
  const newPasswordConfirmationInputRef = useRef<HTMLInputElement>(null)
  const selectFileRef = useRef<HTMLInputElement>(null)
  const lockerImgRef = useRef<HTMLImageElement>(null)
  const colorSpanRef = useRef<HTMLSpanElement>(null)

  const userCompleteName = user.first_name + ' ' + user.last_name

  function handleChangeProfilePictureModalChangeState() {
    if (changeProfilePictureModalIsOpen) {
      document.body.style.overflow = 'auto'
      setNewProfilePicture('')
      setChangeProfilePictureModalIsOpen(false)
    } else {
      document.body.style.overflow = 'hidden'
      setChangeProfilePictureModalIsOpen(true)
    }
  }

  function handleChangePasswordModalChangeState() {
    if (changePasswordModalIsOpen) {
      document.body.style.overflow = 'auto'
      setChangePasswordModalIsOpen(false)
    } else {
      document.body.style.overflow = 'hidden'
      setChangePasswordModalIsOpen(true)
    }
  }

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const oldPassword = oldPasswordInputRef.current!.value
    const newPassword = newPasswordInputRef.current!.value
    const newPasswordConfirm = newPasswordConfirmationInputRef.current!.value

    const newPasswordsMatches = newPassword == newPasswordConfirm

    if (!newPasswordsMatches) {
      toast.error('Senhas não coincidem')
      return
    }

    const requestBody = {
      email: user.email,
      password: newPassword,
      oldPassword: oldPassword,
    }

    setLoading(true)

    api
      .put('/students/update-password', requestBody)
      .then(() => {
        toast.success('Senha alterada com sucesso')
        setLoading(false)
        handleChangePasswordModalChangeState()
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.response.data.erro)
      })
  }

  function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.files) {
      setSelectedImage(event.currentTarget.files[0])
      const objectUrl = URL.createObjectURL(event.currentTarget.files[0])
      setNewProfilePicture(objectUrl)
    }
  }

  async function handleUploadImage() {
    if (selectedImage) {
      const formData = new FormData()
      formData.append('profile', selectedImage)
      formData.append('ra', user.ra)
      setLoading(true)
      api
        .post('/uploadImage', formData, { withCredentials: true })
        .then(res => {
          setUser(res.data)
          setLoading(false)
          handleChangeProfilePictureModalChangeState()
        })
        .catch(err => {
          setLoading(false)
          toast.error(err.response.data.erro)
        })
    }
  }

  async function loadLocker() {
    if (user.locker_number) {
      api
        .get(`/lockers/${user.locker_number}`)
        .then(response => {
          setStudentLocker(response.data)
          setLoadingLocker(false)
        })
        .catch(err => {
          toast.error(err.response.data.erro)
          setLoadingLocker(false)
        })
    } else {
      setLoadingLocker(false)
    }
  }

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

  useEffect(() => {
    loadLocker()
  }, [user])

  useEffect(() => {
    if (studentLocker) {
      lockerImgRef.current!.style.backgroundColor = studentLocker.section.color
      colorSpanRef.current!.style.backgroundColor = studentLocker.section.color
    }
  }, [studentLocker])

  return (
    <>
      <div id='toast'>
        <Toaster
          toastOptions={{
            style: {
              background: darkTheme ? '#333' : '#fff',
              color: darkTheme ? '#fff' : '#000',
            },
          }}
        />
      </div>
      <div id='profile-page' className={darkTheme ? 'dark' : ''}>
        <Modal
          open={changeProfilePictureModalIsOpen}
          closeModal={handleChangeProfilePictureModalChangeState}
        >
          <div className='modal-container'>
            <img
              src={
                newProfilePicture
                  ? newProfilePicture
                  : user.profile_picture_url
                  ? user.profile_picture_url
                  : darkTheme
                  ? DefaultProfilePicDarkMode
                  : DefaultProfilePic
              }
              alt='Foto de perfil'
            />
            <div className='button-container'>
              <input
                type='file'
                ref={selectFileRef}
                onChange={event => handleSelectImage(event)}
              />
              <button
                onClick={() => {
                  selectFileRef.current!.click()
                }}
              >
                Selecionar Outra Foto
              </button>
              <button
                onClick={handleUploadImage}
                className={loading ? 'loading' : ''}
              >
                {loading ? <Loading /> : 'Confirmar Escolha'}
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={changePasswordModalIsOpen}
          closeModal={handleChangePasswordModalChangeState}
        >
          <div className='modal-container vertical-modal'>
            <div className='title'>
              <h1>Alterar Senha</h1>
              <button onClick={handleChangePasswordModalChangeState}>
                <AiOutlineClose />
              </button>
            </div>
            <form
              className='body'
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                handleChangePassword(e)
              }}
            >
              <input
                placeholder='Senha antiga'
                type='text'
                ref={oldPasswordInputRef}
              />
              <Link to='/login/recuperar-senha'>Esqueceu sua senha?</Link>
              <input
                placeholder='Nova senha'
                type='text'
                ref={newPasswordInputRef}
              />
              <input
                placeholder='Confirmar nova senha'
                type='text'
                ref={newPasswordConfirmationInputRef}
              />

              <button type='submit' className={loading ? 'loading' : ''}>
                {loading ? <Loading /> : 'Continuar'}
              </button>
            </form>
          </div>
        </Modal>

        <NavBar />
        <main>
          <section className='profile-informations-section'>
            <img
              src={
                user.profile_picture_url
                  ? user.profile_picture_url
                  : darkTheme
                  ? DefaultProfilePicDarkMode
                  : DefaultProfilePic
              }
              alt='Foto de perfil'
            />
            <div className='section-content'>
              <div className='text-container'>
                <p className='name'>{userCompleteName}</p>
                <p className='email'>{user.email}</p>
              </div>
              <button onClick={handleChangeProfilePictureModalChangeState}>
                Alterar Foto de Perfil
              </button>
              <button onClick={handleChangePasswordModalChangeState}>
                Alterar Senha
              </button>
            </div>
          </section>
          <section className='locker-section'>
            <h1>Meu Armário</h1>

            {user.locker_number == null && !loadingLocker ? (
              <div className='locker no-locker'>
                <img src={NoLockersFoundedImg} alt='' />
                <div className='content-section'>
                  <p>Nenhum armário alugado</p>
                  <Link to='/alugar-armario'>Alugar um Armário</Link>
                </div>
              </div>
            ) : (
              <div className='locker contain-locker'>
                {!studentLocker ? (
                  <Loading />
                ) : (
                  <>
                    <div className='left-section'>
                      <div className='img-container' ref={lockerImgRef}>
                        <img src={LockerImg} alt='' />
                      </div>
                      <div className='left-section-content'>
                        <p className='title'>Armário {user.locker_number}</p>
                        <p className='subtitle'>
                          Alugado em {studentLocker.rentedAt?.split(' ')[0]}
                        </p>
                      </div>
                    </div>
                    <div className='right-section'>
                      <div className='row'>
                        <p className='row-title'>Andar:</p>
                        <p className='row-content'>
                          {studentLocker.FK_section_id <= 5
                            ? 'Segundo'
                            : 'Primeiro'}
                        </p>
                      </div>
                      <div className='row'>
                        <p className='row-title'>Cor:</p>
                        <p className='row-content'>
                          {transformHexToPlainText(studentLocker.section.color)}
                        </p>
                        <span
                          className='locker-color'
                          ref={colorSpanRef}
                        ></span>
                      </div>
                      <div className='row'>
                        <p className='row-title'>À Esquerda:</p>
                        <p className='row-content'>
                          {studentLocker.section.left_room}
                        </p>
                      </div>
                      <div className='row'>
                        <p className='row-title'>À Direita:</p>
                        <p className='row-content'>
                          {studentLocker.section.right_room}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ProfilePage
