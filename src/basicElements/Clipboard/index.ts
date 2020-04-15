import { Clipboard } from 'react-native'

export const setString = (textToCopy: string): void => {
    Clipboard.setString(textToCopy)
}
