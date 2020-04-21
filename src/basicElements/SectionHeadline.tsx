import React, { FunctionComponent, ReactElement } from 'react'
import { Text } from 'react-native'

type Props = {
    children: string
}

const SectionHeadline: FunctionComponent<Props> = ({ children }): ReactElement => {
    return <Text style={{ fontSize: 24 }}>{children}</Text>
}

export default SectionHeadline
