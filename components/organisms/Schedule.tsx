import { useState, useEffect } from 'react'
import Image from 'next/image'

import * as yup from "yup"
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Step from '../../components/molecules/Step'
import IStep from '../../components/molecules/Step/Props'

import Button from '../../components/atoms/Button'
import ScheduleStatus from '../../components/molecules/ScheduleStatus'

import { getDateSchedule, getTimeSchedule } from '../../services/schedule'
import { getRegions, getCities, getPokemons } from '../../services/pokeapi'

type Inputs = {
  firstName: string,
  lastName: string,
  region: string,
  city: string,
  myPokemonTeam: [],
  dateSchedule: string,
  timeSchedule: string
}

const schema = yup.object().shape({
  firstName: yup.string().required("Por favor, digite seu nome"),
  lastName: yup.string().min(3, "sobrenome must be at least 3 characters").required("Por favor, digite seu sobrenome"),
  region: yup.string().required("Por favor, selecione uma região"),
  city: yup.string().required("Por favor, selecione uma cidade"),
  myPokemonTeam: yup.array().min(1).required().nullable(),
  dateSchedule: yup.string().required("Por favor, selecione uma data"),
  timeSchedule: yup.string().required("Por favor, selecione um horário")
}).required();

export default function Schedule() {
  const [datesScheduling, setDatesScheduling] = useState([])
  const [timesScheduling, setTimesScheduling] = useState([])
  const [regions, setRegions] = useState([])
  const [cities, setCities] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [myPokemonTeam, setMyPokemonTeam] = useState([{ name: '' }])
  const [data, setData] = useState({
    dateSchedule: '',
    timeSchedule: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange"
  })
  const onSubmit: SubmitHandler<Inputs> = data => {
    setIsSuccess(true)
    setData(data)
  }

  useEffect(() => {
    getDateSchedule()
      .then(data => setDatesScheduling(data))

    getRegions()
      .then(data => setRegions(data.results))

    getPokemons()
      .then(data => setPokemons(data.results))
  }, [])

  const handlerSelectDateSchedule = (event: { target: { value: any }}) => {
    const value = event.target.value
    getTimeSchedule(value)
      .then(data => setTimesScheduling(data))
  }

  const handlerSelectRegion = (event: { target: { value: any }}) => {
    const value = event.target.value
    getCities(value)
      .then(data => setCities(data.locations))
  }

  const handlePokemonForm = (event: { target: { value: any, name: any }}, index: number) => {
    let newPokemonForm = [...myPokemonTeam]
    newPokemonForm[index]['name'] = event.target.value
    setMyPokemonTeam(newPokemonForm)
  }

  const addPokemon = () => setMyPokemonTeam([...myPokemonTeam, { name: '' }])

  const stepProps: IStep = {
    actualStepName: 'Agendar Consulta',
    title: 'Agendar Consulta',
    slogan: 'Recupere seus pokémons em 5 segundos',
    router: 'agendar-consulta'
  }

  const formatDate = (date: string): string => {
    const split = date.split('/')
    return `${split[1]}/${split[0]}/${split[2]}`
  }

  const getSubTotal = () => 70 * myPokemonTeam.length

  const getTotal = () => {
    const TAX = 2.10
    const value = (getSubTotal() + TAX).toFixed(2)
    return `Valor Total: R$ ${value}`
  }

  return (
    <section className="schedule">
      <Step { ...stepProps } />



      {
        isSuccess ?
        <div className="status-schedule">
          <ScheduleStatus title="Consulta Agendada" status="success" message={`Seu agendamento para dia ${formatDate(data.dateSchedule)}, às ${data.timeSchedule}, para 0x pokémons foi realizado com sucesso!`}  />
        </div> :
        <div className="container">
          <h3 className="title">Preencha o formulário abaixo para agendar sua consulta</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="field-group">
              <fieldset>
                <label htmlFor="name" className="label">Nome</label>
                <input {...register('firstName', { required: true, minLength: 3, maxLength: 20 })} className="input" placeholder="Digite seu nome"  />
                <p className="error">{errors.firstName?.message}</p>
              </fieldset>
              <fieldset>
                <label htmlFor="lastName" className="label">Sobrenome</label>
                <input {...register('lastName', { required: true, pattern: /^[A-Za-z]+$/i })} className="input" placeholder="Digite seu sobrenome"  />
                <p className="error">{errors.lastName?.message}</p>
              </fieldset>
            </div>

            <div className="field-group">
              <fieldset>
                <div className="selectContainer">
                  <label htmlFor="region" className="label">Região</label>
                  <select className="select" {...register('region')} onChange={handlerSelectRegion}>
                    <option disabled defaultValue="">Selecione sua região</option>
                    {regions.map((region: { name: string, url: string }) => (
                      <option value={region.url} key={region.url}>{region.name}</option>
                    ))}
                  </select>

                  <div className="icon">
                    <Image src="/images/down-arrow.svg" alt="Arrow" width={21} height={39} />
                  </div>
                  <p className="error">{errors.region?.message}</p>
                </div>
              </fieldset>

              <fieldset>
                <div className="selectContainer">
                  <label htmlFor="city" className="label">Cidade</label>
                  <select className="select" {...register('city')}>
                    <option disabled defaultValue="">Selecione sua cidade</option>
                    {cities.map((city: { name: string, url: string }) => (
                      <option value={city.name} key={city.url}>{city.name}</option>
                    ))}
                  </select>

                  <div className="icon">
                    <Image src="/images/down-arrow.svg" alt="Arrow" width={21} height={39} />
                  </div>
                  <p className="error">{errors.city?.message}</p>
                </div>
              </fieldset>
            </div>

            <div className="pokemons">
              <h3 className="title">Cadastre seu time</h3>
              <p className="subtitle">Atendemos até 06 pokémons por vez</p>

              <ul className="list">
                {myPokemonTeam.map((_, index) => (
                  <li className="item" key={index}>
                    <p className="pokemon-counter">Pokémon 0{index+1}</p>
                    <fieldset>
                      <div className="selectContainer">
                        <select className="select" {...register(`myPokemonTeam.${index}` as const)} onChange={e => handlePokemonForm(e, index)}>
                          <option disabled defaultValue="">Selecione seu pokémon</option>
                          {pokemons.map((p: {name: string, url: string}, index) => (
                            <option value={p.name} key={index}>{p.name}</option>
                          ))}
                        </select>

                        <div className="icon">
                          <Image src="/images/down-arrow.svg" alt="Arrow" width={21} height={39} />
                        </div>
                      </div>
                    </fieldset>
                  </li>
                ))}
              </ul>

              <a onClick={addPokemon} className={`btn-outline ${myPokemonTeam.length >= 6 ? 'btn-disabled' : ''}`}>Adicionar novo pokémon ao time... +</a>
            </div>

            <div className="field-group">
              <fieldset>
                <div className="selectContainer">
                  <label htmlFor="dateSchedule" className="label">Data para Atendimento</label>
                  <select id="dateSchedule" className="select" {...register('dateSchedule')} onChange={(e) => handlerSelectDateSchedule(e)}>
                    <option disabled defaultValue="">Selecione uma data</option>
                    {datesScheduling.map(date => {
                      return <option key={date} value={date}>{formatDate(date)}</option>;
                    })}
                  </select>

                  <div className="icon">
                    <Image src="/images/down-arrow.svg" alt="Arrow" width={21} height={39} />
                  </div>
                  <p className="error">{errors.dateSchedule?.message}</p>
                </div>
              </fieldset>

              <fieldset>
                <div className="selectContainer">
                  <label htmlFor="timeSchedule" className="label">Horário de Atendimento</label>
                  <select className="select" {...register('timeSchedule')}>
                    <option disabled defaultValue="">Selecione um horário</option>
                    {timesScheduling.map(time => (
                      <option value={time} key={time}>{time}</option>
                    ))}
                  </select>

                  <div className="icon">
                    <Image src="/images/down-arrow.svg" alt="Arrow" width={21} height={39} />
                  </div>
                  <p className="error">{errors.timeSchedule?.message}</p>
                </div>
              </fieldset>
            </div>

            <hr />

            <div className="details-schedule">
              <ul>
                <li>
                  <p>Número de pokémons a serem atendidos:</p>
                  <span>{myPokemonTeam.length}</span>
                </li>
                <li>
                  <p>Atendimento unitário por pokémon: </p>
                  <span>R$ 70,00</span>
                </li>
                <li>
                  <p>Subtotal:</p>
                  <span>R$ {getSubTotal()}</span>
                </li>
                <li>
                  <p>Taxa geracional*:</p>
                  <span>R$ 2,10</span>
                </li>
              </ul>

              <span>*adicionamos uma taxa de 3%, multiplicado pelo número da geração mais alta do time, com limite de até 30%</span>
            </div>


            <ul className="resume">
              <h3>{getTotal()}</h3>
              <Button disabled={!isValid || !isDirty} textLabel="Concluir Agendamento" onClickEvent={() => handleSubmit(onSubmit)} />
            </ul>

          </form>
        </div>
      }


    </section>
  );
}