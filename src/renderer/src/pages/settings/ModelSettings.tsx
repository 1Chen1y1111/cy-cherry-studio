import { useDefaultModel } from '@renderer/hooks/useAssistants'
import { useProviders } from '@renderer/hooks/useProvider'
import { Model } from '@renderer/types'
import { Select } from 'antd'
import { find } from 'lodash'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SettingContainer, SettingDivider, SettingTitle } from './components'

const ModelSettings: FC = () => {
  const { defaultModel, topicNamingModel, setDefaultModel, setTopicNamingModel } = useDefaultModel()
  const { providers } = useProviders()
  const allModels = providers.map((p) => p.models).flat()
  const { t } = useTranslation()

  const selectOptions = providers
    .filter((p) => p.models.length > 0)
    .map((p) => ({
      label: t(`provider.${p.id}`),
      title: p.name,
      options: p.models.map((m) => ({
        label: m.name,
        value: m.id
      }))
    }))

  return (
    <SettingContainer>
      <SettingTitle>{t('settings.models.default_assistant_model')}</SettingTitle>
      <SettingDivider />
      <Select
        defaultValue={topicNamingModel.id}
        style={{ width: 200 }}
        onChange={(id) => setDefaultModel(find(allModels, { id }) as Model)}
        options={selectOptions}
      />
      <div style={{ height: 30 }} />
      <SettingTitle>{t('settings.models.topic_naming_model')}</SettingTitle>
      <SettingDivider />
      <Select
        defaultValue={defaultModel.id}
        style={{ width: 200 }}
        onChange={(id) => setTopicNamingModel(find(allModels, { id }) as Model)}
        options={selectOptions}
      />
    </SettingContainer>
  )
}

export default ModelSettings
