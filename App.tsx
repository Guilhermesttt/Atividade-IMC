import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Topo } from "./components/Topo";
import Toast from "./components/Toast";
import RNToast from "react-native-toast-message";
import { Resultado } from "./components/Resultado";

export default function App() {
  // HOOK
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [imc, setIMC] = useState<number>(Number);
  const [classificacao, setClassificacao] = useState<string>("");

  function validarCampos() {
    if (peso === "" || altura === "") {
      Toast.show({
        type: "error",
        text1: "Atenção",
        text2: "Preencha o peso e a altura",
      });
      return;
    }

    const p = parseFloat(peso.replace(",", "."));
    const a = parseFloat(altura.replace(",", "."));

    if (isNaN(p) || isNaN(a) || p <= 0 || a <= 0) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Informe valores numéricos válidos",
      });
      return;
    }

    calcularIMC();
  }

  function calcularIMC() {
    let imcCalculado =
      parseFloat(peso) / (parseFloat(altura) * parseFloat(altura));
    setIMC(imcCalculado);

    if (imcCalculado < 18.5) {
      setClassificacao("Abaixo do peso");
    } else if (imcCalculado < 25) {
      setClassificacao("Peso normal");
    } else if (imcCalculado < 30) {
      setClassificacao("Sobrepeso");
    } else {
      setClassificacao("Obeso");
    }
  }

  return (
    <View style={styles.container}>
      <Topo />

      <View style={styles.form}>
        <Text style={styles.label}>Peso</Text>
        <TextInput style={styles.input} onChangeText={setPeso}></TextInput>
        <Text style={styles.label}>Altura</Text>
        <TextInput style={styles.input} onChangeText={setAltura}></TextInput>
        <TouchableOpacity style={styles.btn} onPress={validarCampos}>
          <Text style={styles.btnText}>Calcular</Text>
        </TouchableOpacity>
        //PROPS
        <Resultado resultadoIMC={imc} classificacao={classificacao} />
      </View>
      <StatusBar style="auto" />
      <RNToast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06C",
  },
  form: {
    backgroundColor: "#FFF",
    height: "100%",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 30,
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#DDD",
    borderRadius: 10,
    fontSize: 22,
    padding: 10,
    height: 60,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#F90",
    padding: 15,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  btnText: {
    color: "#FFF",
    fontSize: 22,
  },
});
