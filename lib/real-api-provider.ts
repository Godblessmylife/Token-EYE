interface CoinGeckoTokenData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_supply: number
  circulating_supply: number
  fully_diluted_valuation: number
  total_volume: number
}

interface MoralisTokenMetadata {
  name: string
  symbol: string
  decimals: number
  logo?: string
  thumbnail?: string
}

class RealApiProvider {
  private readonly COINGECKO_API_KEY = "CG-ZcT9v45YADpkAFBTqAQKbT7d"
  private readonly MORALIS_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijc5MzYxOTVjLTcyZjgtNDBmNy05ZWFmLWQwNzM4ZjYyNGI4MSIsIm9yZ0lkIjoiODA1MjciLCJ1c2VySWQiOiI4MDE3MSIsInR5cGVJZCI6IjI3MjMwZTI3LWZiNTQtNDViYi1iZjVjLWI3NDRhOTRkM2QwNSIsInR5cGUiOiJQUk9KRUNUIiwiaWF0IjoxNzE5MjIyOTUzLCJleHAiOjQ4NzQ5ODI5NTN9.1v5gUELWK9OSpB0bm0R_vEFe21LrVejUcUN9lpS0mFI"

  private readonly NETWORK_MAPPING = {
    ethereum: "ethereum",
    bsc: "binance-smart-chain",
    polygon: "polygon-pos",
    avalanche: "avalanche",
    arbitrum: "arbitrum-one",
    optimism: "optimistic-ethereum",
  }

  private readonly MORALIS_CHAIN_MAPPING = {
    ethereum: "0x1",
    bsc: "0x38",
    polygon: "0x89",
    avalanche: "0xa86a",
    arbitrum: "0xa4b1",
    optimism: "0xa",
  }

  async getTokenMetadata(contractAddress: string, blockchain: string): Promise<MoralisTokenMetadata | null> {
    try {
      const chainId = this.MORALIS_CHAIN_MAPPING[blockchain as keyof typeof this.MORALIS_CHAIN_MAPPING]
      if (!chainId) return null

      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=${chainId}&addresses%5B0%5D=${contractAddress}`,
        {
          headers: {
            "X-API-Key": this.MORALIS_API_KEY,
            accept: "application/json",
          },
        },
      )

      if (!response.ok) return null

      const data = await response.json()
      return data[0] || null
    } catch (error) {
      console.error("Moralis API error:", error)
      return null
    }
  }

  async getTokenPriceData(contractAddress: string, blockchain: string): Promise<CoinGeckoTokenData | null> {
    try {
      const network = this.NETWORK_MAPPING[blockchain as keyof typeof this.NETWORK_MAPPING]
      if (!network) return null

      // First try to get token by contract address
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${network}/contract/${contractAddress}?x_cg_demo_api_key=${this.COINGECKO_API_KEY}`,
      )

      if (!response.ok) return null

      const tokenData = await response.json()

      return {
        id: tokenData.id,
        symbol: tokenData.symbol,
        name: tokenData.name,
        current_price: tokenData.market_data?.current_price?.usd || 0,
        price_change_percentage_24h: tokenData.market_data?.price_change_percentage_24h || 0,
        market_cap: tokenData.market_data?.market_cap?.usd || 0,
        total_supply: tokenData.market_data?.total_supply || 0,
        circulating_supply: tokenData.market_data?.circulating_supply || 0,
        fully_diluted_valuation: tokenData.market_data?.fully_diluted_valuation?.usd || 0,
        total_volume: tokenData.market_data?.total_volume?.usd || 0,
      }
    } catch (error) {
      console.error("CoinGecko API error:", error)
      return null
    }
  }

  async getTokenHolders(contractAddress: string, blockchain: string): Promise<any[]> {
    try {
      const chainId = this.MORALIS_CHAIN_MAPPING[blockchain as keyof typeof this.MORALIS_CHAIN_MAPPING]
      if (!chainId) return []

      const response = await fetch(
        `https://deep-index.moralis.io/api/v2.2/erc20/${contractAddress}/owners?chain=${chainId}&limit=10&order=DESC`,
        {
          headers: {
            "X-API-Key": this.MORALIS_API_KEY,
            accept: "application/json",
          },
        },
      )

      if (!response.ok) return []

      const data = await response.json()
      return data.result || []
    } catch (error) {
      console.error("Moralis holders API error:", error)
      return []
    }
  }
}

export const realApiProvider = new RealApiProvider()
