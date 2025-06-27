import changelogEn from '@renderer/assets/changelog/CHANGELOG.en.md?raw'
import changelogZh from '@renderer/assets/changelog/CHANGELOG.zh.md?raw'
import styles from '@renderer/assets/styles/changelog.module.scss'
import i18next from 'i18next'
import { FC } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'

const Changelog: FC = () => {
  const language = i18next.language
  const changelog = language === 'zh-CN' ? changelogZh : changelogEn

  return (
    <Container className={styles.markdown}>
      <Markdown children={changelog} />
    </Container>
  )
}

const Container = styled.div`
  font-size: 14px;
  background-color: var(--color-background-soft);
  margin-top: 40px;
  padding: 20px;
  border-radius: 5px;
  width: 650px;
`

export default Changelog
