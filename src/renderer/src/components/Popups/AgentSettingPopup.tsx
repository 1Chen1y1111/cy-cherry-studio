import { Agent } from '@renderer/types'
import { Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, useState } from 'react'

import { Box } from '../Layout'
import { TopView } from '../TopView'

interface AgentSettingPopupShowParams {
  agent: Agent
}

interface Props extends AgentSettingPopupShowParams {
  resolve: (agent: Agent) => void
}

const AgentSettingPopupContainer: FC<Props> = ({ agent, resolve }) => {
  const [name, setName] = useState(agent.name)
  const [description, setDescription] = useState(agent.description)
  const [prompt, setPrompt] = useState(agent.prompt)
  const [open, setOpen] = useState(true)

  const onOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onClose = () => {
    resolve({ ...agent, name, description, prompt })
  }

  return (
    <Modal title={agent.name} open={open} onOk={onOk} onCancel={handleCancel} afterClose={onClose}>
      <Box mb={8}>Name</Box>
      <Input placeholder="Agent Name" value={name} onChange={(e) => setName(e.target.value)} allowClear autoFocus />
      <Box mt={8} mb={8}>
        Description
      </Box>
      <TextArea
        rows={4}
        placeholder="Agent Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        autoFocus
      />
      <Box mt={8} mb={8}>
        Prompt
      </Box>
      <TextArea
        rows={4}
        placeholder="Agent Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        autoFocus
      />
    </Modal>
  )
}

export default class AgentSettingPopup {
  static topViewId = 0
  static hide() {
    TopView.hide(this.topViewId)
  }
  static show(props: AgentSettingPopupShowParams) {
    return new Promise<Agent>((resolve) => {
      this.topViewId = TopView.show(
        <AgentSettingPopupContainer
          {...props}
          resolve={(v) => {
            resolve(v)
            this.hide
          }}
        />
      )
    })
  }
}
