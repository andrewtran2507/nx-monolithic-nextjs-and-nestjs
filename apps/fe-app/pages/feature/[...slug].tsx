import * as React from 'react';
import {
  getPostIdList,
  arrBreadcrumbs,
  TBreadcrumbsItem,
} from '@fe-app/shared-ui';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Shop({ postData }: { postData: TBreadcrumbsItem }) {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h3">
          {postData?.path}
        </Typography>
        <div>
          <h2>What is Lorem Ipsum?</h2>
          <p>
            <strong>Lorem Ipsum</strong>
            <span>
              {`is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.`}
            </span>
          </p>
        </div>

        <Typography component="h4" gutterBottom>
          {new Date().toDateString()}
        </Typography>
      </Box>
    </Container>
  );
}

type TParams = {
  params: {
    slug: string[];
  };
};

export async function getStaticProps({ params }: TParams) {
  const curId: string = params.slug.splice(
    params.slug.length - 1,
    params.slug.length,
  )[0];
  const postData = arrBreadcrumbs.find((d) => d.id === curId);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getPostIdList();
  return {
    paths,
    fallback: false,
  };
}
