import React, { useState, useMemo } from 'react'
import { Input } from 'uikit'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useTranslation } from 'contexts/Localization'

const StyledInput = styled(Input)`
  border-radius: 16px;
  margin-left: auto;
  font-family: 'Red Hat Text', sans-serif;
  font-size: 14px;
  line-height: 19px;
  box-shadow: none;
  border: none;
  background: #eaf2f7;
  &::placeholder {
    color: #49468a;
    font-weight: bold;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    width: 234px;
  }
`

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const Container = styled.div<{ toggled: boolean }>``

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({ onChange: onChangeCallback, placeholder = 'Search' }) => {
  const [toggled, setToggled] = useState(false)
  const [searchText, setSearchText] = useState('')

  const { t } = useTranslation()

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    debouncedOnChange(e)
  }

  return (
    <Container toggled={toggled}>
      <InputWrapper>
        <StyledInput
          value={searchText}
          onChange={onChange}
          placeholder={t(placeholder)}
          onBlur={() => setToggled(false)}
        />
      </InputWrapper>
    </Container>
  )
}

export default SearchInput
