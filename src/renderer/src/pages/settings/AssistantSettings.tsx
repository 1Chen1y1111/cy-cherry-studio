import { useDefaultAssistant } from '@renderer/hooks/useAssistants'
import { Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SettingContainer, SettingDivider, SettingSubtitle, SettingTitle } from './components'

const AssistantSettings: FC = () => {
  const { defaultAssistant, updateDefaultAssistant } = useDefaultAssistant()
  const { t } = useTranslation()

  return (
    <SettingContainer>
      <SettingTitle>{t('settings.assistant.title')}</SettingTitle>
      <SettingDivider />
      <SettingSubtitle style={{ marginTop: 0 }}>{t('common.name')}</SettingSubtitle>
      <Input
        placeholder={t('common.assistant') + t('common.name')}
        value={defaultAssistant.name}
        onChange={(e) => updateDefaultAssistant({ ...defaultAssistant, name: e.target.value })}
      />
      <SettingSubtitle>{t('common.description')}</SettingSubtitle>
      <TextArea
        rows={2}
        placeholder={t('common.assistant') + t('common.description')}
        value={defaultAssistant.description}
        onChange={(e) => updateDefaultAssistant({ ...defaultAssistant, description: e.target.value })}
      />
      <SettingSubtitle>{t('common.prompt')}</SettingSubtitle>
      <TextArea
        rows={4}
        placeholder={t('common.assistant') + t('common.prompt')}
        value={defaultAssistant.prompt}
        onChange={(e) => updateDefaultAssistant({ ...defaultAssistant, prompt: e.target.value })}
      />
    </SettingContainer>
  )
}

export default AssistantSettings
