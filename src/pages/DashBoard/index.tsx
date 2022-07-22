import React, { useCallback, useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from 'react-day-picker';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-day-picker/lib/style.css';
import {Container,
     Header,
      HeaderContent,
       Profile, Schedule, Calendar, Content, NextAppointment, Section, Appointment} from './styles'
import logoImg from '../../assets/logo-senac.png';
import { FiClock, FiPower, FiCalendar } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

interface AgendamentosDisponiveis {
    instrutor: {
        id: Number;
        nome: string;
        email: string;
    };
    dataInicio: string;
    dataFim: string;
    horarioInicio: string;
    horarioFim: string;
    numeroLaboratorio: string;
    curso: {
        id: Number;
        nome: string;

    };
    laboratorio:{
        id: Number;
        nome: string;
    }
}

const DashBoard: React.FC = () => {
    const { signOut } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date()); 
    /*Estado que armazena os agendamento que estão registrados*/
    const [monthAvailability, setMonthAvailability] = useState<AgendamentosDisponiveis[]>([]);
    // const [startDate, setStartDate] = useState(
    //     setHours(setMinutes(new Date(), 0), 9)
    //   );
    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    const handleDateCalendar = useCallback(() => {
        
    }, []);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available) {
            setSelectedDate(day);
        }
    }, []);    

    useEffect(() => {
        api.get('api/buscarAgendamento', {
        }).then(response => {
            console.log("Dados do agendamento" + response.data);
            
            setMonthAvailability(response.data)
        });
    },[monthAvailability]);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
        .map(monthDay => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();

            const date = new Date(year, month);
        })
        console.log("monthAvailability " + dates);
        
    }, [currentMonth, monthAvailability]);

    const agendamentoDaManha = useMemo(() => {
        return monthAvailability.filter(agendamento => {
            const horarioInicial = agendamento.horarioInicio.split(":");
            
            return Number(horarioInicial[0]) < 12;
        })
    },[monthAvailability]);

    const agendamentoTarde = useMemo(() => {
        return monthAvailability.filter(agendamento => {
            const horarioInicial = agendamento.horarioInicio.split(":");
            
            return Number(horarioInicial[0]) >= 12;
        })
    },[monthAvailability]);

    return(
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="Logo senac" />
                    <Profile>
                        <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt="Douglas Lisboa" />
                        <div>
                            <span>Bem-vindo</span>
                            <strong>Douglas Lisboa</strong>
                        </div>
                    </Profile>

                    <button  onClick={signOut} type="button">
                        <FiPower/>
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 21</span>
                        <span>Quinta-feira</span>
                    </p>

                    <Button name="Agendar" className=""><Link to="/scheduled">Agendar</Link></Button>
                    {/* <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt="Douglas Lisboa" />

                            <strong>Douglas Lisboa</strong>
                            <span>
                                <FiClock/>
                                08:00
                            </span>
                        </div>
                    </NextAppointment> */}

                    <Section>
                        <strong>Manhã</strong>
                        {agendamentoDaManha.map(agendamento => (<Appointment>
                            <span>
                                <FiCalendar/>
                                {agendamento.dataInicio}
                            </span>
                            <span>
                                Numero do laboratorio
                            </span>

                            <span>
                            <FiClock/> {agendamento.horarioInicio}
                            </span>

                            <div>
                                <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt={agendamento.instrutor.nome} />
                                
                                <strong>{agendamento.instrutor.nome}</strong>
                                <span>Curso: {agendamento.curso.nome}</span> 
                            </div>
                        </Appointment>
                        ))}
                        
                    </Section>

                    <Section>
                        <strong>Tarde</strong>
                        {agendamentoTarde.map(agendamento => (<Appointment>
                            <span>
                                <FiCalendar/>
                                {agendamento.dataInicio}
                            </span>
                            <span><FiClock/>{agendamento.horarioInicio}</span>

                            <div>
                                <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt={agendamento.instrutor.nome} />
                                
                                <strong>{agendamento.instrutor.nome}</strong>
                                <span>Curso: {agendamento.curso.nome}</span> 
                            </div>
                        </Appointment>
                        ))}
                    </Section>

                </Schedule>
                <Calendar>
                    <DayPicker
                        
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    )
};

export default DashBoard;