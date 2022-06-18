import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react"
import React from "react"
import styled from "styled-components"

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                fontSize="14px"
                boxShadow='sm'
                _checked={{
                    bg: '#0b0146',
                    color: 'white',
                    borderColor: '#0b0146',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}

interface props {
    onChange: (nextValue: string) => void
}

const PaymentRadioButtons: React.FC<props> = ({ onChange }) => {
    const options = ['All', 'Email', 'Type', 'Mode', 'Status']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'filter',
        defaultValue: 'All',
        onChange: onChange,
    })

    const group = getRootProps()

    return (
        <Container>
            <HStack {...group}>
                {options.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                        <RadioCard key={value} {...radio}>
                            {value}
                        </RadioCard>
                    )
                })}
            </HStack>
        </Container>
    )
}

export default PaymentRadioButtons

const Container = styled.div`
    & label {
        margin-bottom: 0 !important;
    }
`;