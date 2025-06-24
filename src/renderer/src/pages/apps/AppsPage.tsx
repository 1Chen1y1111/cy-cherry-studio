import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { Navbar, NavbarCenter } from '@renderer/components/app/Navbar'
import { colorPrimary } from '@renderer/config/antd'
import { SYSTEM_ASSISTANTS } from '@renderer/config/assistant'
import { useAssistants } from '@renderer/hooks/useAssistants'
import { getDefaultAssistant } from '@renderer/services/assistant'
import { SystemAssistant } from '@renderer/types'
import { Button, Col, Row, Tooltip, Typography } from 'antd'
import { find, groupBy } from 'lodash'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const { Title } = Typography

const AppsPage: FC = () => {
  const { assistants, addAssistant } = useAssistants()
  const { t } = useTranslation()

  const assistantGroups = groupBy(SYSTEM_ASSISTANTS, 'group')

  const onAddAssistant = (assistant: SystemAssistant) => {
    addAssistant({
      ...getDefaultAssistant(),
      ...assistant
    })

    window.message.success({
      content: t('message.assistant.added.content'),
      key: 'assistant-added',
      style: { marginTop: '5vh' }
    })
  }

  return (
    <Container>
      <Navbar>
        <NavbarCenter style={{ borderRight: 'none' }}>{t('apps.title')}</NavbarCenter>
      </Navbar>
      <ContentContainer>
        {Object.keys(assistantGroups).map((group) => (
          <div key={group}>
            <Title level={3} key={group} style={{ marginBottom: 16 }}>
              {group}
            </Title>
            <Row gutter={16}>
              {assistantGroups[group].map((assistant, index) => {
                const added = find(assistants, { id: assistant.id })
                return (
                  <Col span={6} key={group + index} style={{ marginBottom: 16 }}>
                    <AssistantCard>
                      <AssistantHeader>
                        <Title level={5} style={{ marginBottom: 0, color: colorPrimary }}>
                          {assistant.name}
                        </Title>
                        {added && (
                          <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            ghost
                            icon={<CheckOutlined style={{ fontSize: 12 }} />}
                          />
                        )}
                        {!added && (
                          <Tooltip placement="top" title={t('apps.assistant.added.tooltip')} arrow>
                            <Button
                              type="default"
                              shape="circle"
                              size="small"
                              style={{ padding: 0 }}
                              icon={<PlusOutlined style={{ fontSize: 12 }} />}
                              onClick={() => onAddAssistant(assistant)}
                            />
                          </Tooltip>
                        )}
                      </AssistantHeader>
                      <AssistantCardPrompt>{assistant.prompt}</AssistantCardPrompt>
                    </AssistantCard>
                  </Col>
                )
              })}
            </Row>
          </div>
        ))}
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - var(--navbar-height));
  padding: 20px;
  overflow-y: scroll;
`

const AssistantCard = styled.div`
  margin-bottom: 16px;
  background-color: #141414;
  border-radius: 10px;
  padding: 20px;
`

const AssistantHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const AssistantCardPrompt = styled.div`
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1.5;
`

export default AppsPage
