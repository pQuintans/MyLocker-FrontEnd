import React from 'react'

import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

import TeamImage from '../../assets/PcIlustration.png'
import PlataformImage from '../../assets/ScreensIlustration.png'
import ProblemImage from '../../assets/ProblemIlustration.png'

import './styles.scss'

function AboutUsPage() {
  return (
    <div id='aboutUs-page'>
      <NavBar />
      <main>
        <div className='title-container'>
          <p className='page-title'>Sobre Nós</p>
          <p className='page-subtitle'>
            Conheça um pouco mais sobre o projeto.
          </p>
        </div>
        <div className='cards-container'>
          <div className='left-container'>
            <div className='card'>
              <img src={TeamImage} alt='A Equipe' />
              <div className='cards-content'>
                <p className='title team'>A Equipe:</p>
                <p className='content'>
                  Nosso time é formado por 5 estudantes do curso técnico em
                  informática, lecionado no COTIL. São eles Enzo Arilla, Fábio
                  Henrique, Pedro Quintans, Pedro Ricieri e Vínicius Laureano.
                </p>
              </div>
            </div>
            <div className='card'>
              <div className='cards-content'>
                <p className='title plataform'>A Plataforma:</p>
                <p className='content'>
                  O MyLocker consiste em um sistema de locação e gerenciamento
                  de armários, sendo a parte web somente para alunos,
                  permitindo-os visualizar e pagar pelos seus armários
                </p>
              </div>
              <img src={PlataformImage} alt='A Plataforma' />
            </div>
          </div>
          <div className='right-container'>
            <div className='cards-content'>
              <p className='title problem'>O Problema:</p>
              <p className='content'>
                Todos os anos, diversos alunos reclamavam sobre a demora e
                transtornos ao alugar um armário em um sistema sem tecnologia
                como o do Cotil. Visto isso e a partir de nossas próprias
                experiências, o MyLocker surgiu para auxiliar e facilitar esse
                processo.
              </p>
            </div>
            <img src={ProblemImage} alt='O Problema' />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AboutUsPage
