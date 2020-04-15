import React, { FunctionComponent, ReactElement } from 'react'
import { FlexingView, Text, Touchable, Clipboard } from '../basicElements'

type CopyToClipBoardProps = {
    textToCopy: string
}
const CopyToClipBoard: FunctionComponent<CopyToClipBoardProps> = ({ textToCopy }): ReactElement => {
    return (
        <FlexingView style={{ paddingHorizontal: 16 }}>
            <Touchable onPress={(): void => Clipboard.setString(textToCopy)}>
                <Text style={{ fontSize: 14, color: '#3899EC' }}>Copy</Text>
            </Touchable>
        </FlexingView>
    )
}

export default CopyToClipBoard
