import useAvatar from '@renderer/hooks/useAvatar'
import LocalStorage from '@renderer/services/storage'
import { useAppDispatch } from '@renderer/store'
import { setAvatar } from '@renderer/store/runtime'
import { compressImage } from '@renderer/utils'
import { Avatar, message, Upload } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

import { SettingContainer, SettingDivider, SettingRow, SettingRowTitle, SettingTitle } from './components'

const GeneralSettings: FC = () => {
  const { avatar } = useAvatar()
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  const onUploadChangeHandler = async ({ file }) => {
    try {
      const _file = file.originFileObj as File
      const compressFile = await compressImage(_file)
      await LocalStorage.storeImage('avatar', compressFile)
      dispatch(setAvatar(await LocalStorage.getImage('avatar')))
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  }

  return (
    <SettingContainer>
      {contextHolder}
      <SettingTitle>General Settings</SettingTitle>
      <SettingDivider />
      <SettingRow>
        <SettingRowTitle>Avatar</SettingRowTitle>
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
    </SettingContainer>
  )
}

const UserAvatar = styled(Avatar)`
  cursor: pointer;
`

export default GeneralSettings
