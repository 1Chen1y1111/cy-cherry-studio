import { useSystemProviders } from '@renderer/hooks/useProvider'
import { Provider } from '@renderer/types'
import { FC, useState } from 'react'
import styled from 'styled-components'

import ModalProviderSetting from './components/ModalProviderSetting'

const LanguageModelsSettings: FC = () => {
  const providers = useSystemProviders()
  const [selectedProvider, setSelectedProvider] = useState<Provider>(providers[0])

  return (
    <Container>
      <ProviderListContainer>
        {providers.map((provider) => (
          <ProviderListItem
            key={JSON.stringify(provider)}
            className={provider.id === selectedProvider?.id ? 'active' : ''}
            onClick={() => setSelectedProvider(provider)}>
            {provider.name}
          </ProviderListItem>
        ))}
      </ProviderListContainer>
      <ModalProviderSetting provider={selectedProvider} />
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const ProviderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--assistants-width);
  height: 100%;
  border-right: 0.5px solid var(--color-border);
  padding: 10px;
`

const ProviderListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 10px;
  margin-bottom: 5px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #135200;
  }
  &.active {
    background: #135200;
    font-weight: bold;
  }
`

export default LanguageModelsSettings
