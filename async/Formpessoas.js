import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function FormPessoaAsyncStorage({ navigation, route }) {

    const { acao, pessoa: pessoaAntiga } = route.params

    const [NomE, setNomE] = useState('')
    const [IdadE, setIdadE] = useState('')
    const [PesO, setPesO] = useState('')
    const [AlturA, setAlturA] = useState('')

    const [showMensagemErro, setShowMensagemErro] = useState(false)


    useEffect(() => {

        console.log('pessoa -> ', pessoaAntiga)

        if (pessoaAntiga) {
            setNomE(pessoaAntiga.NomE)
            setIdadE(pessoaAntiga.IdadE)
            setPesO(pessoaAntiga.PesO)
            setAlturA(pessoaAntiga.AlturA)
        }

    }, [])


    function salvar() {

        if (NomE === '' || IdadE === '' || PesO === '' || AlturA === '') {
            setShowMensagemErro(true)
        } else {
            setShowMensagemErro(false)

            const novaPessoa = {
                NomE: NomE,
                IdadE: IdadE,
                PesO: PesO,
                AlturA: AlturA
            }

            const objetoEmString = JSON.stringify(novaPessoa)
            console.log("🚀 ~ file: FormPessoa.js:47 ~ salvar ~ objetoEmString:", objetoEmString)

            console.log(typeof (objetoEmString))

            const objeto = JSON.parse(objetoEmString)
            console.log("🚀 ~ file: FormPessoa.js:52 ~ salvar ~ objeto:", objeto)

            console.log(typeof (objeto))


            if (pessoaAntiga) {
                acao(pessoaAntiga, novaPessoa)
            } else {
                acao(novaPessoa)
            }



            Toast.show({
                type: 'success',
                text1: 'Pessoa salva com sucesso!'
            })

            navigation.goBack()
        }

    }


    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{pessoaAntiga ? 'Editar Pessoa' : 'Adicionar Pessoa'}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'NomE'}
                    mode='outlined'
                    value={NomE}
                    onChangeText={text => setNomE(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'IdadE'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={IdadE}
                    onChangeText={text => setIdadE(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'PesO | KG'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={PesO}
                    onChangeText={text => setPesO(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'AlturA | cm'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={AlturA}
                    onChangeText={text => setAlturA(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                {showMensagemErro &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                }


            </View>

            <View style={styles.buttonContainer}>

                <Button
                    style={styles.button}
                    mode='contained-tonal'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>

                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={salvar}
                >
                    Salvar
                </Button>


            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        margin: 10
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
})