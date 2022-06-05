import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'

import { useUser } from '../../hooks/useUser'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import Modal from '../../components/Modal/index'

import NoLockersFoundedImg from '../../assets/NoLockersFounded.png'
import LockerTestImage from '../../assets/LockerImage.png'

import './styles.scss'
import toast, { Toaster } from 'react-hot-toast'
import api from '../../api'
import { compare } from 'bcryptjs'

function ProfilePage() {
  const { user, setUser } = useUser()

  console.log(user)

  const [changeProfilePictureModalIsOpen, setChangeProfilePictureModalIsOpen] =
    useState(false)
  const [changePasswordModalIsOpen, setChangePasswordModalIsOpen] =
    useState(false)

  const oldPasswordInputRef = useRef<HTMLInputElement>(null)
  const newPasswordInputRef = useRef<HTMLInputElement>(null)
  const newPasswordConfirmationInputRef = useRef<HTMLInputElement>(null)
  const selectFileRef = useRef<HTMLInputElement>(null)

  const [newProfilePicture, setNewProfilePicture] = useState('')
  const [selectedImage, setSelectedImage] = useState<File>()
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

  function testLockerRentedFunctionality() {
    setUser(current => ({ ...current, locker_number: 752 }))
  }

  async function handleChangePassword() {
    const oldPassword = oldPasswordInputRef.current!.value
    const passwordsMatches = await compare(oldPassword, user.password!)

    if (!passwordsMatches) {
      toast.error('Sua senha antiga está incorreta')
      return
    }

    const newPassword = newPasswordInputRef.current!.value
    const newPasswordConfirm = newPasswordConfirmationInputRef.current!.value
    const regex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)

    const passwordHasLettersAndNumbers = regex.test(newPassword)

    if (!passwordHasLettersAndNumbers) {
      toast.error(
        'Sua senha deve conter numeros, letras minusculas e letras maiusculas'
      )
      return
    }

    const newPasswordsMatches = newPassword == newPasswordConfirm

    if (!newPasswordsMatches) {
      toast.error('Senhas não coincidem')
      return
    }

    const requestBody = {
      ra: user.ra,
      password: newPassword,
    }

    api
      .put('/students/update-password', requestBody)
      .then(response => {
        setUser(previousState => ({
          ...previousState,
          password: response.data.hashPassword,
        }))
        toast.success('Senha alterada com sucesso')
        handleChangePasswordModalChangeState()
      })
      .catch(err => {
        console.log(err.response.data)
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
      api
        .post('/upload', formData)
        .then(res => {
          setUser(res.data)
          handleChangeProfilePictureModalChangeState()
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }

  return (
    <>
      <div id='toast'>
        <Toaster />
      </div>
      <div id='profile-page'>
        <Modal
          open={changeProfilePictureModalIsOpen}
          closeModal={handleChangeProfilePictureModalChangeState}
        >
          <div className='modal-container'>
            <img
              src={
                newProfilePicture ? newProfilePicture : user.profile_picture_url
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
              <button onClick={handleUploadImage}>Confirmar Escolha</button>
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
            <div className='body'>
              <input
                placeholder='Senha antiga'
                type='text'
                ref={oldPasswordInputRef}
              />
              <p>Esqueceu sua senha?</p>
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
              <button onClick={handleChangePassword}>Continuar</button>
            </div>
          </div>
        </Modal>

        <NavBar />
        <main>
          <section className='profile-informations-section'>
            <img src={user.profile_picture_url} alt='Foto de perfil' />
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

            {user.locker_number == undefined ? (
              <div className='locker no-locker'>
                <img src={NoLockersFoundedImg} alt='' />
                <div className='content-section'>
                  <p onClick={testLockerRentedFunctionality}>
                    Nenhum armário alugado
                  </p>
                  <Link to='/alugar-armario'>Alugar um Armário</Link>
                </div>
              </div>
            ) : (
              <div className='locker contain-locker'>
                <div className='left-section'>
                  <img src={LockerTestImage} alt='' />
                  <div className='left-section-content'>
                    <p className='title'>Armário {user.locker_number}</p>
                    <p className='subtitle'>Alugado em 25/03/2022</p>
                  </div>
                </div>
                <div className='right-section'>
                  <div className='row'>
                    <p className='row-title'>Andar:</p>
                    <p className='row-content'>Segundo</p>
                  </div>
                  <div className='row'>
                    <p className='row-title'>Cor:</p>
                    <p className='row-content'>Vermelho</p>
                    <span className='locker-color'></span>
                  </div>
                  <div className='row'>
                    <p className='row-title'>À Esquerda:</p>
                    <p className='row-content'>Saúde</p>
                  </div>
                  <div className='row'>
                    <p className='row-title'>À Direita:</p>
                    <p className='row-content'>Sala 13</p>
                  </div>
                </div>
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
