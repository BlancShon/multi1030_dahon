import { Button, Col, Container, Form, FormControl, FormGroup, InputGroup, Row } from "react-bootstrap";
import MyIconBox from "./MyIconBox";
import dynamic from 'next/dynamic'
import { searchCondition, categories } from "../searchCondition";

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {useEffect, useState } from "react";
import CheckBoxList from "./CheckBoxList";

const BgParallax = dynamic(() => import('../../../components/BgParallax'), { ssr: false })

const HeroAndSearchForm = ({selectedCategory, onChangeCategoryHandler, onChangeSearchFormHandler, bankFin}) => {
    const [selectOptions, setSelectOptions] = useState(searchCondition[selectedCategory])
    const [selectedValues, setSelectedValues] = useState({});
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [keyword, setKeyword] = useState('');
    
    useEffect(() => {
        setSelectOptions(searchCondition[selectedCategory]);
        setSelectedValues({}); // 선택된 값 초기화
    }, [selectedCategory]);

    const onCategoryHandler = (selectedCategory) => {
        onChangeCategoryHandler(selectedCategory)
    }

    const onChangeOptionHandler = (condition, value) => {
        setSelectedValues((prevSelectedValues) => ({
            ...prevSelectedValues,
            [condition]: value,
        }));

        console.log("컨디션 뭐 넘어왔지",condition)
        console.log("벨류는 뭐 넘어왔지",value)
        console.log("셀렉티드벨류는 뭐있지",selectedValues)
        console.log('키워드는 뭐지~', keyword)
    };

    // 나중에 검색누르면 파라미터들 다 보내기
    const handleSearch = () => {
      onChangeSearchFormHandler();
    }

    return (
        <div>
            <BgParallax
                    imgSrc='/images/MyImages/financeBGImg.jpg'
                    type='scroll' // scale, opacity, scroll-opacity, scale-opacity
                    speed={0.5} // from -1.0 to 2.0
                    overlay='gradient' // or overlay={50} from 0 to 100
                    className='position-relative bg-dark zindex-1 py-xxl-5'
                >

                    <Container className='content-overlay mt-n2 mb-lg-3'>

                        <Container as='section' className='pt-xxl-4 mt-md-2 mb-md-4'>
                            <Row className='g-3 g-xl-4'>
                            {categories.map((category, indx) => (
                                <Col key={indx} className="text-center">
                                    <div onClick={()=>onCategoryHandler(category.value)}>
                                        <MyIconBox
                                            type='card-shadow'
                                            media={category.media}
                                            mediaColor={category.color}
                                            mediaShape='circle'
                                            title={category.title}
                                            align='center'
                                            isSelected={selectedCategory === category.value}
                                        />
                                    </div>
                                </Col>
                            ))}
                            </Row>
                        </Container>

                        <Col xl={8} lg={9} md={10} className='mx-auto px-0 m-5'>
                            {/* Search form */}
                            <FormGroup className='d-block d-md-flex rounded-md-pill mb-5 mb-sm-4'>
                                <InputGroup size='lg' className='border-end-md'>
                                <InputGroup.Text className='text-muted ps-3'>
                                    <i className='fi-search'></i>
                                </InputGroup.Text>
                                <FormControl aria-label='Search field' placeholder='What are you looking for?' value={keyword} onChange={(e)=> setKeyword(e.target.value)} />
                                </InputGroup>
                                <hr className='d-md-none my-2' />
                                <div className='d-sm-flex'>
                                
                                    <Button size='lg' className='rounded-pill w-100 w-md-auto ms-sm-3'>Search</Button>
                                </div>
                            </FormGroup>
                        </Col>
                        
                        <div className="px-5 mt-3">
                            <Container className='pb-3 d-flex justify-content-center'>

                                 {Object.keys(selectOptions).map((condition, index) => {
                                    return (
                                        <Form.Select
                                            key={index}
                                            aria-label="Default select example"
                                            className="mx-5"
                                            value={selectedValues[condition] || ""}
                                            name={condition}
                                            onChange={(e) =>
                                                onChangeOptionHandler(
                                                    condition,
                                                    e.target.value
                                                )
                                            }
                                        >
                                        {Object.keys(selectOptions[condition]).map((innerCond) => {
                                             const finValue =  selectOptions[condition][innerCond];
                                            return (
                                                <option
                                                key={innerCond}
                                                value={`${innerCond}`}
                                            >
                                                {finValue}
                                            </option>
                                            )
                                            
                                        })}
                                        </Form.Select>
                                    )
                                })}

                            </Container>
                        </div>

                    </Container>
                        {/* <div className='position-absolute d-none d-xxl-block bottom-0 start-0 w-100 bg-white zindex-1' style={{borderTopLeftRadius: '30px', borderTopRightRadius: '30px', height: '30px', marginBottom: '-65px'}}></div> */}
                </BgParallax>

                <div className='px-5 pb-5'>
                    <div className="mt-3">
                        <Row>
                            <Col xs={1} className='text-center'>은행별</Col>
                            <Col xs={10}>
                                {
                                  <div>
                                    <CheckBoxList  listName={'은행'} list={bankFin["020000"]} indx='020000' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies} />
                                    <CheckBoxList listName={'여신전문'} list={bankFin["030200"]} indx='030200' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                    <CheckBoxList listName={'저축은행'} list={bankFin["030300"]} indx='030300' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                    <CheckBoxList listName={'보험'} list={bankFin["050000"]} indx='050000' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                    <CheckBoxList listName={'금융투자'} list={bankFin["060000"]} indx='060000' selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies}  />
                                  </div>
                                }
                            </Col>
                        </Row>
                    </div> 
                </div>
        </div>
    )
}

export default HeroAndSearchForm;