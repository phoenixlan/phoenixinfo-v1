import React from "react";
import styled from "styled-components";

const S = {
    ScheduleElementContainer: styled.div`
        display: flex;
    `,
    Time: styled.div`
        display: flex;
        flex-flow: column;
        color: #a455df;
        font-size: 1.25em;
        min-width: 3.5em;
        font-weight: 500;
        letter-spacing: .1em;
        flex: 0;
        margin-top: .1em;
    `,
        Day: styled.span`
            font-size: 0.65em;
        `,
    LineElement: styled.div`
        margin-left: 1em;
        display: flex;
        flex-flow: column;
        height: 100%;
        flex: 0;
    `,
        TopLine: styled.div`
            position: relative;
            left: 6px;
            width: 4px;
            height: 1em;
            background-color: #a455df;
        `,
        Square: styled.div`
            position: relative;
            width: 1em;
            height: 1em;
            background-color: #a455df;
            transform: rotate(45deg);
        `,
        BottomLine: styled.div`
            position: relative;
            left: 6px;
            width: 4px;
            height: auto;
            flex: 1;
            background-color: #a455df;
        `,

    ElementInformation: styled.div`
        display: flex;
        flex-flow: column;
        margin-left: 2em;
        margin-top: .45em;
        flex: 1 10000em;
        
        letter-spacing: .1em;
    `,
        Title: styled.span`
            display: flex;
            font-size: 1.25em;
            font-weight: 400;
        `,
        Subtitle: styled.span`
            display: flex;
            font-size: 1em;
            font-weight: 400;
        `,
        Text: styled.span`
            margin: .75em 0;
        `,
}

export const Schedule = ({ agenda }) => {
    return (
        <>
            {
                agenda.map((element) => {
                    return(
                        <S.ScheduleElementContainer>
                            <S.Time>
                                <S.Day>{new Date(element.time*1000).toLocaleString('default', {weekday: 'short'})}</S.Day>
                                {new Date(element.time*1000).toLocaleString('default', {hour: '2-digit', minute: '2-digit'})}
                            </S.Time>
                            <S.LineElement>
                                <S.TopLine />
                                <S.Square />
                                <S.BottomLine />
                            </S.LineElement>
                            <S.ElementInformation>
                                <S.Title>{element.title}</S.Title>
                                {/*<S.Subtitle>Subtitle ex. Runde 1 av 3</S.Subtitle>*/}
                                <S.Text>
                                    {element.description}
                                </S.Text>
                            </S.ElementInformation>
                        </S.ScheduleElementContainer>
                    )
                })
            
            
            }
        </>
    )
}