import { Card, Col } from "react-bootstrap";
// import classes from './Result.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultCard = ({finName, prdtName, prdtInfo1, prdtInfo2, prdtInfo3, prdtInfo4}) => {
    const maxValue = 20; // 최대값 지정
    const data = [
        { name: prdtInfo3, 금리: prdtInfo3 },
        { name: prdtInfo4, 금리: prdtInfo4 }
      ];

    const cardStyle = {
        // width: '13rem',
        // height: '23rem',
        
    };


    return (
        <Col>
            <Card style={{backgroundColor: '#f5f5f5', border: '2px solid black', cursor: 'pointer', minWidth: '180px'}} elevation={3}>
                <Card.Header className='bg-warning text-white fw-bold'>{finName}</Card.Header>
                <Card.Body>
                    <Card.Title as='h6'><b>{prdtName}</b></Card.Title>
                        <ul>
                            <li>{prdtInfo1}</li><hr></hr>
                            <li>{prdtInfo2}</li><hr></hr>
                        </ul>
                        <div style={{ marginLeft: '-40px' }}>
                        <ResponsiveContainer width="100%" height='100%' aspect={1.7}>
                            <BarChart  data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, maxValue]} /> {/* y-축의 최대값 지정 */}
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="금리" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ResultCard;