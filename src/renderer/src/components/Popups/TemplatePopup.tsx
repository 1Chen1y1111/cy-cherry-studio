import { Modal } from 'antd'
import { FC, useState } from 'react'

import { Box } from '../Layout'
import { TopView } from '../TopView'

interface ShowParams {
  title: string
}

interface Props extends ShowParams {
  resolve: (data: any) => void
}

const PopupContainer: FC<Props> = ({ title, resolve }) => {
  const [open, setOpen] = useState(true)

  const onOk = () => {
    setOpen(false)
  }

  const onCancel = () => {
    setOpen(false)
  }

  const onClose = () => {
    resolve({})
  }

  return (
    <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} afterClose={onClose}>
      <Box $mb={8}>Name</Box>
    </Modal>
  )
}

export default class TemplatePopup {
  static topViewId = 0

  static hide() {
    TopView.hide(this.topViewId)
  }

  static show(props: ShowParams) {
    return new Promise((resolve) => {
      this.topViewId = TopView.show(
        <PopupContainer
          key={this.topViewId}
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
