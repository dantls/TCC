export const useGetData = () => {
  const getProviders = () => {
    // try {
    //   const response = await api.get('/films')
    //   return response.data
    // } catch (error) {
    //   console.log({ error })
    //   return { error }
    // }
  }

  const getSearchResult = async (query:string) => {
    // try {
    //   const response = await api.get(`/search?query=${query}`)
    //   return response.data
    // } catch (error) {
    //   console.log({ error })
    //   return { error }
    // }
  }

  return {
    getProviders,
    getSearchResult

  }
}