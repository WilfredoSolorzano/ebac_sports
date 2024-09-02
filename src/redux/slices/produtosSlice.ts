import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type ProdutosState = {
  itens: Produto[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ProdutosState = {
  itens: [],
  status: 'idle'
}

export const fetchProdutos = createAsyncThunk(
  'produtos/fetchProdutos',
  async () => {
    const response = await fetch(
      'https://fake-api-tau.vercel.app/api/ebac_sports'
    )
    return (await response.json()) as Produto[]
  }
)

const produtosSlice = createSlice({
  name: 'produtos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProdutos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProdutos.fulfilled, (state, action) => {
        state.itens = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchProdutos.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export default produtosSlice.reducer
