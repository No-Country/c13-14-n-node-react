import styled from 'styled-components'

import { COLOR_BUTTON_PRIMARY, COLOR_BUTTON_PRIMARY_HOVER, COLOR_BUTTON_SECONDARY, COLOR_BUTTON_SECONDARY_HOVER } from '../../config/theme'

export const ButtonPrimary = styled.button`
  width: ${props => props.width || '100%'};
  height: 41px;
  border-radius: 60px;
  background: ${COLOR_BUTTON_PRIMARY};
  cursor: pointer;
  transition: 0.4s ease;
  color: white;
  &:hover {
    background: ${COLOR_BUTTON_PRIMARY_HOVER};
  }
`
export const ButtonSecondary = styled.button`
  width: ${props => props.width || '30%'};
  height: 41px;
  border-radius: 60px;
  background: ${COLOR_BUTTON_SECONDARY};
  cursor: pointer;
  transition: 0.4s ease;
  color: black;
  margin: 10px;
  &:hover {
    background: ${COLOR_BUTTON_SECONDARY_HOVER};
  }
`
