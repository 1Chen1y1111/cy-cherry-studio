import { LoadingOutlined, MinusOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { SYSTEM_MODELS } from '@renderer/config/models'
import { getModelLogo } from '@renderer/config/provider'
import { useProvider } from '@renderer/hooks/useProvider'
import { fetchModels } from '@renderer/services/api'
import { Model, Provider } from '@renderer/types'
import { getDefaultGroupName, isFreeModel, runAsyncFunction } from '@renderer/utils'
import { Avatar, Button, Empty, Flex, Modal, Tag } from 'antd'
import Search from 'antd/es/input/Search'
import { groupBy, isEmpty, uniqBy } from 'lodash'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TopView } from '../../../components/TopView'

interface ShowParams {
  provider: Provider
}

interface Props extends ShowParams {
  resolve: (data: any) => void
}

const PopupContainer: FC<Props> = ({ provider: _provider, resolve }) => {
  const [open, setOpen] = useState(true)
  const { provider, models, addModel, removeModel } = useProvider(_provider.id)
  const [listModels, setListModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { t } = useTranslation()

  const systemModels = SYSTEM_MODELS[_provider.id] || []
  const allModels = uniqBy([...systemModels, ...listModels, ...models], 'id')

  const list = searchText
    ? allModels.filter((model) => model.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    : allModels

  const modelGroups = groupBy(list, 'group')

  const onOk = () => {
    setOpen(false)
  }

  const onCancel = () => {
    setOpen(false)
  }

  const onClose = () => {
    resolve({})
  }

  const onAddModel = (model: Model) => {
    addModel(model)
  }

  const onRemoveModel = (model: Model) => {
    removeModel(model)
  }

  useEffect(() => {
    runAsyncFunction(async () => {
      try {
        setLoading(true)
        const models = await fetchModels(_provider)
        setListModels(
          models.map((model) => ({
            id: model.id,
            // @ts-ignore name
            name: model.name || model.id,
            provider: _provider.id,
            group: getDefaultGroupName(model.id),
            // @ts-ignore description
            description: model?.description
          }))
        )
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ModalHeader = () => {
    return (
      <Flex>
        <ModelHeaderTitle>
          {t(`provider.${provider.name}`)} {t('common.models')}
        </ModelHeaderTitle>
        {loading && <LoadingOutlined size={20} />}
      </Flex>
    )
  }

  return (
    <Modal
      title={<ModalHeader />}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      afterClose={onClose}
      footer={null}
      width="600px"
      styles={{
        content: { padding: 0 },
        header: { padding: 22, paddingBottom: 15 }
      }}>
      <SearchContainer>
        <Search placeholder={t('settings.provider.search_placeholder')} allowClear onSearch={setSearchText} />
      </SearchContainer>
      <ListContainer>
        {Object.keys(modelGroups).map((group) => (
          <div key={group}>
            <ListHeader key={group}>{group}</ListHeader>
            {modelGroups[group].map((model) => {
              const hasModel = provider.models.find((m) => m.id === model.id)
              return (
                <ListItem key={model.id}>
                  <ListItemHeader>
                    <Avatar src={getModelLogo(model.id) || null} size={24}>
                      {model.name[0].toUpperCase()}
                    </Avatar>
                    <ListItemName>
                      {model.name}
                      {isFreeModel(model) && (
                        <Tag style={{ marginLeft: 10 }} color="green">
                          Free
                        </Tag>
                      )}
                      {!isEmpty(model.description) && <Question onClick={() => onShowModelInfo(model)} />}
                    </ListItemName>
                  </ListItemHeader>
                  {hasModel ? (
                    <Button type="default" onClick={() => onRemoveModel(model)} icon={<MinusOutlined />} />
                  ) : (
                    <Button type="primary" onClick={() => onAddModel(model)} icon={<PlusOutlined />} />
                  )}
                </ListItem>
              )
            })}
          </div>
        ))}
        {isEmpty(list) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t('settings.models.empty')} />}
      </ListContainer>
    </Modal>
  )
}

const onShowModelInfo = (model: Model) => {
  window.modal.info({
    title: model.name,
    content: model?.description,
    icon: null,
    maskClosable: true
  })
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  padding-bottom: 20px;
`

const ListContainer = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
  padding-bottom: 20px;
`

const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background-soft);
  padding: 8px 22px;
  color: #ffffff50;
`

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 22px;
`

const ListItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 10px;
  height: 22px;
`

const ListItemName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-left: 6px;
`

const ModelHeaderTitle = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
`

const Question = styled(QuestionCircleOutlined)`
  cursor: pointer;
  margin: 0 10px;
  color: #888;
`

export default class EditModelsPopup {
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
