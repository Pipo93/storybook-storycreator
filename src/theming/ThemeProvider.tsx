import React, { createContext, ReactElement, ReactNode, useContext } from 'react'

type Theme = {
    header: {
        colors: {
            titleColor: string
            backgroundColor: string
            linkColor: string
        }
        fonts: {
            fontFamily?: string
            titleSize: number | string
            titleWeight: 'bold' | number
        }
    }
}

const defaultTheme: Theme = {
    header: {
        colors: {
            titleColor: '#000',
            backgroundColor: '#FBFBFB',
            linkColor: '#3899EC',
        },
        fonts: {
            // fontFamily: 'Helvetica Neue',
            titleSize: 36,
            titleWeight: 'bold',
        },
    },
}

type ThemeContextType = {
    theme?: Theme
}

type ThemeContextProviderProps = ThemeContextType & {
    children: ReactNode
}

const ThemeContext = createContext<Partial<ThemeContextType>>({ theme: defaultTheme })

const ThemeProvider = ({
    children,
    theme = defaultTheme,
}: ThemeContextProviderProps): ReactElement => {
    return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

const useThemeContext = (): ThemeContextType => useContext<ThemeContextType>(ThemeContext)

export { ThemeProvider, useThemeContext }
