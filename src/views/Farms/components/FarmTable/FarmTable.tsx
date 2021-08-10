import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType, useMatchBreakpoints } from 'uikit'
import { useTranslation } from 'contexts/Localization'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  userDataReady: boolean
  sortColumn?: string
}

const Container = styled.div`
  width: 100%;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableHead = styled.thead`
  filter: ${({ theme }) => theme.card.dropShadow};
  border-radius: 16px;
  margin-bottom: 16px;
  & tr {
    td {
      font-size: 14px;
      color: #464486;
      padding: 12px 0;
      text-align: center;
      background: ${({ theme }) => theme.card.background};
      &:first-child {
        border-top-left-radius: 70px;
        border-bottom-left-radius: 70px;
      }
      &:last-child {
        border-top-right-radius: 70px;
        border-bottom-right-radius: 70px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        padding-right: 32px;
      }
    }
  }
`

const TableBody = styled.tbody`
  border-radius: 16px;
  & tr {
    border: none;
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { isXl } = useMatchBreakpoints()
  const { t } = useTranslation()
  const { data, columns, userDataReady } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableHead>
              <tr>
                <td>HOT</td>
                {isXl && <td>LP</td>}
                <td>APR</td>
                {isXl && <td>Liquidity</td>}
                <td style={{ textAlign: 'left' }}>Earned</td>
                <td />
              </tr>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return <Row {...row.original} userDataReady={userDataReady} key={`table-row-${row.id}`} />
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {t('To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
