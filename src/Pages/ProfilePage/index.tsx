import React from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { useUser } from '../../hooks/useUser'

import NoLockersFoundedImg from '../../assets/NoLockersFounded.png'
import LockerTestImage from '../../assets/LockerTestImage.png'

import './styles.scss'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const { user, setUser } = useUser()
  const userCompleteName = user.first_name + ' ' + user.last_name

  function testLockerRentedFunctionality() {
    setUser(current => ({ ...current, locker_number: 752 }))
  }

  return (
    <div id='profile-page'>
      <NavBar />
      <main>
        <section className='profile-informations-section'>
          <img src={user.profile_picture_url} alt='Foto de perfil' />
          <div className='section-content'>
            <div className='text-container'>
              <p className='name'>{userCompleteName}</p>
              <p className='email'>{user.email}</p>
            </div>
            <button>Alterar Foto de Perfil</button>
            <button>Alterar Senha</button>
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
  )
}

export default ProfilePage
