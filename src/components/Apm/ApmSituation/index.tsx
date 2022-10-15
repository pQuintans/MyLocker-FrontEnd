import React from 'react'
import { useUser } from '../../../hooks/useUser'

// import '../styles.scss'
import './styles.scss'

interface ApmSituation {
  situation: 'Em Análise' | 'Aprovada' | 'Rejeitada'
}

export function ApmSituation({ situation }: ApmSituation) {
  const { user, setUser } = useUser()

  function handleResendDiscountAplication() {
    setUser({ ...user, apm_id: undefined })
  }

  return (
    <div id='apm-situation'>
      <div className='content'>
        <h1>{situation}</h1>
        {situation == 'Em Análise' ? (
          <>
            <p>
              Sua submissão está sendo analisada pelos funcionários da escola e
              logo você receberá o resultado do seu pedido de desconto.
            </p>
            <p>
              Você já pode alugar um armário com o preço reduzido, porém se algo
              der errado no seu comprovante da APM, você será cobrado pela
              diferença do valor.
            </p>
          </>
        ) : situation == 'Aprovada' ? (
          <>
            <p>
              Sua submissão foi analisada pelos funcionários da escola e seu
              pedido pelo desconto foi aprovado!
            </p>
            <p>
              Você já pode alugar um armário com o preço reduzido sem mais
              preocupações.
            </p>
          </>
        ) : (
          <>
            <p>
              Sua submissão foi analisada pelos funcionários da escola e
              infelizmente não foi aceita.
            </p>
            <p>
              Você pode tentar novamente submetendo um novo comprovante ou
              alugar um armário com o preço normal.
            </p>
            <button onClick={handleResendDiscountAplication}>
              Submeter Novamente
            </button>
          </>
        )}
      </div>
    </div>
  )
}
