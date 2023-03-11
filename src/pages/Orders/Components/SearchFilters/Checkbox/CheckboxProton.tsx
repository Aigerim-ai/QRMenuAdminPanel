import { Checkbox, FormControl, FormGroup, FormControlLabel } from '@mui/material'

interface ILabel {
  id: number
  checked: boolean
  label: string
}

interface Props {
  category: ILabel
  handleChangeCheckBox: (id: number) => void
}
export default function CheckboxProton({ category, handleChangeCheckBox }: Props) {
  return (
    <FormControlLabel
      control={<Checkbox checked={category.checked} onChange={() => handleChangeCheckBox(category.id)} />}
      label={category.label}
    />
  )
}
