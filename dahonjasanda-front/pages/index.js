import React from 'react';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import { Hero } from './deposit/components';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import usePromise from '../pages/stock/components/news/lib/usePromise';



// 지수
import CardWithAddButton from "./stock/components/CardWithAddButton";
import WithAvatarsAndMultilineContent from './stock/components/WithAvatarsAndMultilineContent';
import NewsItem from './stock/components/news/components/item/newsitem';

// 금리
import ResultList from "./loan/components/ResultList";
import { findLoanList } from "./loan/LoansApiService";
import LoanListForMain from './loan/components/LoanListForMain';
import PartyForMain from './party/components/PartyForMain';

const indexPage = () => {
    const [topRateProducts, setTopRateProducts] = useState([]);
    const [pageable, setPageable] = useState({});
    const [page, setPage] = useState(0); // 페이지 상태 추가
    const [indexList, setIndexList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [indexListCount, setIndexListCount] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [stockListCount, setStockListCount] = useState([]);
    
    useEffect(() => {
        const fetchTopRateProducts = async () => {
            try {
                // 예시로 모든 대출 상품을 조회하는 경우
                const response = await findLoanList('/mortgages?page=0'); // 필요한 파라미터에 맞게 수정
                const sortedProducts = response.data.content.sort((a, b) => b.rate - a.rate).slice(0, 2); // 최고 금리 상품 두 개 선택
                
                setTopRateProducts(sortedProducts);
                setPageable({
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    // 기타 필요한 pageable 정보 설정
                });
            } catch (error) {
                console.error("Error fetching top rate products:", error);
            }
        };

        fetchTopRateProducts();
    }, []);

    useEffect(() => {
        getIndexList(searchValue);
    }, [searchValue]);

    useEffect(() => {
        getStockList(searchValue);
    }, [searchValue]);

    const getIndexList = async () => {
        try {
            var url = 'http://localhost/stock/index/List';

            const response = await axios.get(url, {
                withCredentials: true,
            });

            setIndexList(response.data.list);
            setIndexListCount(response.data.listCount);
        } catch (error) {
            console.error('Error fetching index list:', error);
        }
    };

    const getStockList = async () => {
        try {
            var url = 'http://localhost/stock/List';
      
            const response = await axios.get(url, {
                withCredentials: true,
            });
      
            setStockList(response.data.list);
            setStockListCount(response.data.listCount);
        } catch (error) {
            console.error('Error fetching stock list:', error);
        }
    };

    const filteredList = stockList.filter(item => item.sgap >= 0).slice(0, 3);

    const NewsList = () => {
        const [loading, response, error] = usePromise(() => {
          return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
          );
        }, []);
      
        if (loading) {
          return <Typography>대기중...</Typography>;
        }
        if (!response) {
          return null;
        }
      
        if (error) {
          return <Typography>에러 발생!</Typography>;
        }

        const { articles } = response.data;

        const articleArray = articles.slice(0, 2).map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage
        }));

        return articleArray;
    };

    const articles = NewsList();
    
    const handleClick = (url) => {
        window.location.href = url;
    };
    

    const imageName = "main-hero.png";

    return (
        <Main>
                <Hero backgroundImage={imageName}
                    titleText=""
                    subtitleText=""
                    subtitleText2=""
                    opacity={0}
                    />
                <Box mt={1}>
                    <h1 style={{ textAlign: 'center'}}>혼자를 위한 금융 정보</h1>
                    <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid black' }} />
                    <Container>
                        <Box display="flex" justifyContent="center">
                            <Box width="100%">
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            오늘의 지수정보
                                        </Typography>
                                        {/* Add code to display stock information and graphs */}
                                        <CardWithAddButton list={indexList}/>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            오늘의 <span style={{ color: 'red', fontWeight: 'bold' }}>핫</span> 주식정보
                                        </Typography>
                                        <WithAvatarsAndMultilineContent list={filteredList.length > 0 ? filteredList : stockList}/>
                                    </CardContent>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" sx={{ marginBottom: '20px' }}>
                                            오늘의 경제정보
                                        </Typography>
                                        {articles && articles.length > 0 ? (
                                            <Grid container spacing={2}>
                                                {articles.map((item, index) => (
                                                    <Grid item key={index} xs={6}>
                                                        <Card sx={{ flex: 1, maxWidth: 500, marginBottom: 3}}>
                                                            <CardActionArea onClick={() => handleClick(item.url)}>
                                                                <CardMedia
                                                                    sx={{ height: 350 }}
                                                                    image={item.urlToImage}
                                                                    alt="thumbnail"
                                                                />
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="div">
                                                                        {item.title}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {item.description}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ) : (
                                            <Typography>뉴스가 없습니다.</Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Box mt={5}>
                    <h1 style={{ textAlign: 'center' }}>혼자를 위한 대출 정보</h1>
                    <hr style={{ margin: '0px 0', border: 'none', borderBottom: '1px solid black' }} />
                    <Container>
                        <Box>
                            <Box className="my-0">
                                {/* 최고 금리 상품을 ResultList 컴포넌트로 표시 */}
                                {/* <ResultList resultList={topRateProducts} onChangePageHandler={setPage} pageable={pageable} category={"mortgages"} /> */}
                                <LoanListForMain />
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Box mt={5}>
                    <h1 style={{ textAlign: 'center' }}>욜로를 위한 부동산 정보</h1>
                    <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid black' }} />
                    <Container>
                        <Box display="flex" justifyContent="space-between">
                            <Box width="50%">
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            부동산 관련 이미지 1
                                        </Typography>
                                        {/* Add code to display 부동산 관련 이미지 1 */}
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box width="50%">
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            부동산 관련 이미지 2
                                        </Typography>
                                        {/* Add code to display 부동산 관련 이미지 2 */}
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                <Box mt={5} display="flex" justifyContent="space-between">
                    <Box width="50%">
                    <h1 style={{ textAlign: 'center' }}>어떤 식물을 찾고 있나요?</h1>
                    <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid black' }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            식물 1
                                        </Typography>
                                        {/* Add code to display top interest rate product 1 */}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            식물 2
                                        </Typography>
                                        {/* Add code to display top interest rate product 2 */}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box width="50%">
                    <h1 style={{ textAlign: 'center' }}>어떤 동물을 찾고 있나요?</h1>
                    <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid black' }} />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            동물 1
                                        </Typography>
                                        {/* Add code to display top interest rate product 1 */}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            동물 2
                                        </Typography>
                                        {/* Add code to display top interest rate product 2 */}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                    

                </Box>

                <Box mt={5} display="flex" justifyContent="space-between">
                    <Box width="100%">
                    <h1 style={{ textAlign: 'center' }}>만족도 99% 첫 시작하기 좋은 모임</h1>
                    <hr style={{ margin: '20px 0', border: 'none', borderBottom: '1px solid black' }} />
                           <div className='col-11 mx-auto'>
                            <PartyForMain />
                            </div>                 

                    </Box>
                    

                </Box>
        </Main>
    );
}

export default indexPage;
