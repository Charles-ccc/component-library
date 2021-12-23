import React, {useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect} from 'react'
import Input, {InputProps} from '../Input/input'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  onSelect?: (item: DataSourceType) => void
  renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {fetchSuggestions, onSelect, value, renderOption, ...restProps} = props

  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [ showDropdown, setShowDropdown] = useState(false)

  const debounceValue = useDebounce(inputValue, 300)

  useEffect(() => {
    if (debounceValue) {
      const results = fetchSuggestions(debounceValue)
      // 判断 fetchSuggestions(value) 返回的类型
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
  }
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.length && suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex
          })
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='auto-compolete'>
      <Input 
        value={inputValue} 
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      { loading && <div>loading...</div>}
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  )
}

export default AutoComplete