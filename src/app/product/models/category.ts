export interface Category {
  name: string,
  description: string
}

export const CATEGORIES: Category[] = [
  {
    name: 'Medicamento',
    description: 'Um medicamento é uma droga usada para diagnosticar, curar, tratar ou prevenir doenças.'
  },
  {
    name: 'Suplemento',
    description: 'Os suplementos funcionam como um complemento da alimentação. Na maioria dos casos, são indicados para pessoas que apresentam uma carência muito grande de determinado nutriente'
  },
  {
    name: 'Higiene pessoal',
    description: 'Produtos de higiene são uma vasta gama de material de higiene os quais possuem função de limpeza e desinfecção do corpo.'
  },
  {
    name: 'Dispositivo médico',
    description: 'Um dispositivo médico é um aparelho ou instrumento que é utilizado por profissionais da saúde com o objetivo de diagnosticar, prevenir e tratar enfermidades.'
  },
  {
    name: 'Cosmético',
    description: 'Cosmético é aquilo que é relativo à beleza humana. Alguns produtos de higiene pessoal podem ser considerados cosméticos.'
  }
]
