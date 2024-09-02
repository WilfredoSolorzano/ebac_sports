import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from './redux/store'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { RootState } from './redux/store'
import { adicionarAoCarrinho } from './redux/slices/cartSlice'
import { toggleFavorito } from './redux/slices/favoritosSlice'
import { fetchProdutos } from './redux/slices/produtosSlice'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useAppDispatch()
  const produtos = useSelector((state: RootState) => state.produtos.itens)
  const carrinho = useSelector((state: RootState) => state.carrinho.itens)
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)

  useEffect(() => {
    dispatch(fetchProdutos())
  }, [dispatch])

  const handleAdicionarAoCarrinho = (produto: Produto) => {
    dispatch(adicionarAoCarrinho(produto))
  }

  const handleFavoritar = (produto: Produto) => {
    dispatch(toggleFavorito(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={handleFavoritar}
          adicionarAoCarrinho={handleAdicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
