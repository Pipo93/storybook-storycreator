import { Linking } from 'react-native'

export const openUrl = (url: string): void => {
    Linking.canOpenURL(url).then(canOpen => {
        if (canOpen) {
            Linking.openURL(url)
        }
    })
}
