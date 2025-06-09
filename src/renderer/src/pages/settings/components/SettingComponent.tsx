import { Divider } from 'antd'
import styled from 'styled-components'

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - var(--navbar-height));
  padding: 15px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SettingTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SettingSubtitle = styled.div`
  font-size: 12px;
  color: var(--color-text-3);
  margin: 10px 0;
`

export const SettingDivider = styled(Divider)`
  margin: 10px 0;
`
export const SettingRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SettingRowTitle = styled.div`
  font-size: 14px;
  color: var(--color-text-1);
`
