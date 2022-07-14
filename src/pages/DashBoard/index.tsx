import React, { useCallback, useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {Container,
     Header,
      HeaderContent,
       Profile, Schedule, Calendar, Content, NextAppointment, Section, Appointment} from './styles'
import logoImg from '../../assets/logo-senac.png';
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";

interface AgendamentosDisponiveis {
    instrutor: Object;
    dataInicio: string;
    dataFim: string;
    horarioInicio: string;
    horarioFim: string;
    numeroLaboratorio: string;
    curso: Object;
    laboratorio:Object
}

const DashBoard: React.FC = () => {
    const { signOut } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date()); 
    /*Estado que armazena os agendamentro que estão registrados*/
    const [monthAvailability, setMonthAvailability] = useState<AgendamentosDisponiveis[]>([]);
    
    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available) {
            setSelectedDate(day);
        }
    }, []);    

    useEffect(() => {
        api.get('/agendamento', {
        }).then(response => {
            setMonthAvailability(response.data)
        });
    },[currentMonth, ]);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
        .map(monthDay => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();

            const date = new Date(year, month);
        })
        console.log("monthAvailability " + dates);
        
    }, [currentMonth, monthAvailability]);

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
                        <span>Dia 06</span>
                        <span>Segunda-feira</span>
                    </p>
                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt="Douglas Lisboa" />

                            <strong>Douglas Lisboa</strong>
                            <span>
                                <FiClock/>
                                08:00
                            </span>
                        </div>
                    </NextAppointment>

                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock/>
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt="Douglas Lisboa" />
                                
                                <strong>Douglas Lisboa</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock/>
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt="Douglas Lisboa" />
                                
                                <strong>Douglas Lisboa</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock/>
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars.githubusercontent.com/u/36475975?v=4" alt="Douglas Lisboa" />
                                
                                <strong>Douglas Lisboa</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>
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