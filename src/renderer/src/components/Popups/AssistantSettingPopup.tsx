import { Assistant } from '@renderer/types'
import { Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'

import { Box } from '../Layout'
import { TopView } from '../TopView'

interface AssistantSettingPopupShowParams {
  assistant: Assistant
}

interface Props extends AssistantSettingPopupShowParams {
  resolve: (assistant: Assistant) => void
}

const AssistantSettingPopupContainer: React.FC<Props> = ({ assistant, resolve }) => {
  const [name, setName] = useState(assistant.name)
  const [description, setDescription] = useState(assistant.description)
  const [prompt, setPrompt] = useState(assistant.prompt)
  const [open, setOpen] = useState(true)

  const onOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onClose = () => {
    resolve({ ...assistant, name, description, prompt })
  }

  return (
    <Modal title={assistant.name} open={open} onOk={onOk} onCancel={handleCancel} afterClose={onClose}>
      <Box mb={8}>Name</Box>
      <Input placeholder="Assistant Name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
      <Box mt={8} mb={8}>
        Description
      </Box>
      <TextArea
        rows={4}
        placeholder="Assistant Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoFocus
      />
      <Box mt={8} mb={8}>
        Prompt
      </Box>
      <TextArea
        rows={4}
        placeholder="Assistant Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        autoFocus
      />
    </Modal>
  )
}

export default class AssistantSettingPopup {
  static topViewId = 0
  static hide() {
    TopView.hide(this.topViewId)
  }
  static show(props: AssistantSettingPopupShowParams) {
    return new Promise<Assistant>((resolve) => {
      this.topViewId = TopView.show(
        <AssistantSettingPopupContainer
          {...props}
          resolve={(v) => {
            resolve(v)
            this.hide()
          }}
        />
      )
    })
  }
}
