import useAvatar from '@renderer/hooks/useAvatar'
import { useSettings } from '@renderer/hooks/useSettings'
import LocalStorage from '@renderer/services/storage'
import { useAppDispatch } from '@renderer/store'
import { setAvatar } from '@renderer/store/runtime'
import { setLanguage } from '@renderer/store/settings'
import { compressImage } from '@renderer/utils'
import { Avatar, Select, Upload } from 'antd'
import i18next from 'i18next'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { SettingContainer, SettingDivider, SettingRow, SettingRowTitle, SettingTitle } from './components'

const GeneralSettings: FC = () => {
  const { avatar } = useAvatar()
  const dispatch = useAppDispatch()
  const { language } = useSettings()
  const { t } = useTranslation()

  const onUploadChangeHandler = async ({ file }) => {
    try {
      const _file = file.originFileObj as File
      const compressFile = await compressImage(_file)
      await LocalStorage.storeImage('avatar', compressFile)
      dispatch(setAvatar(await LocalStorage.getImage('avatar')))
    } catch (error: any) {
      window.message.error(error.message)
    }
  }

  const onSelectLanguage = async (value: string) => {
    dispatch(setLanguage(value))
    i18next.changeLanguage(value)
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  return (
    <SettingContainer>
      <SettingTitle>{t('settings.general.title')}</SettingTitle>
      <SettingDivider />
      <SettingRow>
        <SettingRowTitle>{t('common.avatar')}</SettingRowTitle>
        <Upload
          accept="image/png, image/jpeg"
          itemRender={() => null}
          maxCount={1}
          customRequest={() => {}}
          onChange={onUploadChangeHandler}>
          <UserAvatar src={avatar} size="large" />
        </Upload>
      </SettingRow>
      <SettingDivider />
      <SettingRow>
        <SettingRowTitle>{t('common.language')}</SettingRowTitle>
        <Select
          defaultValue={language || 'en-US'}
          style={{ width: 120 }}
          onChange={onSelectLanguage}
          options={[
            { value: 'zh-CN', label: '中文' },
            { value: 'en-US', label: 'English' }
          ]}
        />
      </SettingRow>
      <SettingDivider />
    </SettingContainer>
  )
}

const UserAvatar = styled(Avatar)`
  cursor: pointer;
`

export default GeneralSettings
