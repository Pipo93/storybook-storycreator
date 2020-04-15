import React, { FunctionComponent } from 'react'
import Markdown from '@pipo93/react-native-markdown'
// import Markdown from '../markdown/Markdown'
import { ContentLayout } from '../layouts'
import { CopyToClipBoard } from '../components'
import { FlexingView } from '../basicElements'

type ImportExampleProps = {
    componentExportName: string
    componentImportPath: string
}

const ImportExample: FunctionComponent<ImportExampleProps> = ({
    componentExportName,
    componentImportPath,
}) => {
    const importStatement = `import { ${componentExportName} } from '${componentImportPath}'`
    const SOURCE = `## Import
\`\`\`js
${importStatement}
\`\`\`
`
    return (
        <ContentLayout>
            <Markdown>{SOURCE}</Markdown>
            <FlexingView style={{ paddingBottom: 20 }}>
                <CopyToClipBoard textToCopy={importStatement} />
            </FlexingView>
        </ContentLayout>
    )
}

export default ImportExample
