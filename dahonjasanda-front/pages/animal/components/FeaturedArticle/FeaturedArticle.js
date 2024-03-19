import React from 'react';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const mock = {

  image: 'https://previews.123rf.com/images/denayunebgt/denayunebgt2110/denayunebgt211000181/175743056-%EC%A4%91%EC%9A%94%ED%95%9C-%EB%AC%B8%EC%A0%9C-%EC%8B%9C%EA%B0%84-%EA%B4%80%EB%A6%AC-%EC%9E%91%EC%97%85-%EC%A1%B0%EC%A7%81-%EB%B0%8F-%EC%83%9D%ED%99%9C-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%95%8C%EB%A6%BC-%EB%98%90%EB%8A%94-%ED%9C%B4%EC%9D%BC%EC%9D%84-%EA%B3%84%ED%9A%8D%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%9B%90-%EA%B8%B0%ED%98%B8%EA%B0%80-%EC%9E%88%EB%8A%94-%EB%8B%AC%EB%A0%A5-%EB%B0%B0%EA%B2%BD-%EB%B2%A1%ED%84%B0.jpg',
  description:
    '우리 집 구찌가 약은 제대로 먹었는지, 산책은 언제 했는지, 반려 동물과의 성장 일지를 작성해보세요! 더욱 가까운 가족이 될 기회일지도?',
  title:
    '기른지 며칠이 됐지? 밥은 언제 줬더라? 치료는 언제?',
  author: {
    name: '캘린더 입력 바로가기',
    avatar: 'https://media.istockphoto.com/id/1262025969/ko/%EB%B2%A1%ED%84%B0/%EC%84%A0%ED%83%9D%ED%95%9C-%EB%82%A0%EC%A7%9C%EA%B0%80-%EC%9E%88%EB%8A%94-%EC%BA%98%EB%A6%B0%EB%8D%94%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98.jpg?s=612x612&w=0&k=20&c=hIHsYdIieF5ikqCb7YiSxR-2Lznf7szkO92sxupBdYY=',
  },
};

const FeaturedArticle = () => {
  const theme = useTheme();
  return (

    <Box
    marginTop={-12}>
      
      <Box
        component={'a'}
        href={''}
        display={'block'}
        width={1}
        height={1}
        sx={{
          textDecoration: 'none',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            transform: `translateY(-${theme.spacing(1 / 2)})`,
          },
        }}
      >
        <Box
          component={Card}
          width={1}
          height={1}
          boxShadow={4}
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row-reverse' }}
          sx={{ backgroundImage: 'none' }}
        >
          <Box
            sx={{
              width: { xs: 1, md: '50%' },
              position: 'relative',
            }}
          >
            <Box
              component={'img'}
              loading="lazy"
              height={1}
              width={1}
              src={mock.image}
              alt="..."
              sx={{
                objectFit: 'cover',
                maxHeight: 300,
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
              }}
            />
            <Box
              component={'svg'}
              viewBox="0 0 112 690"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                position: 'absolute',
                bottom: 0,
                top: '-50%',
                left: 0,
                right: 0,
                color: theme.palette.background.paper,
                transform: 'scale(2)',
                height: 1,
                width: 'auto',
                transformOrigin: 'top center',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <path
                d="M0 0h62.759v172C38.62 384 112 517 112 517v173H0V0z"
                fill="currentColor"
              />
            </Box>
          </Box>
          <CardContent
            sx={{
              position: 'relative',
              width: { xs: 1, md: '50%' },
              padding: 6,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant={'h5'} gutterBottom >
                {mock.title}
              </Typography><br></br>
              <Typography color="text.secondary" >{mock.description}</Typography>
            </Box>
            <Box>
              <Divider sx={{ marginY: 2 }} />
              <Box
                marginY={3}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Avatar src={mock.author.avatar} sx={{ marginRight: -39 }} />
                <Box display={'flex'} alignItems={'center'}>
                  <Typography color={'text.secondary'}>
                    {mock.author.name}
                  </Typography>
                </Box>
                <Typography color={'text.secondary'}>{mock.date}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedArticle;
