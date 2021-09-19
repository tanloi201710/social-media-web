import React from 'react';

import { ImageList, ImageListItem, Typography } from '@mui/material';

function ImagesList({arrObj}) {

    function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`,
        };
    }
    return (
        <div >
        {
          arrObj.length === 2 ? 
            <ImageList cols={4} rowHeight={121} variant="quilted">
              {arrObj && arrObj.map((item) => (
                <ImageListItem 
                  key={item.img} 
                  cols={2} 
                  rows={2} 
                  style={{ cursor: 'pointer'}}
                >
                    <img 
                        {...srcset(item.img, 121, item.rows, item.cols)} 
                        alt="" 
                    />
                </ImageListItem>
              ))}
            </ImageList>
          : arrObj.length === 3 ?
            <ImageList cols={3} rowHeight={121} variant="quilted">
                {arrObj && arrObj.map((item,index) => (
                  <ImageListItem 
                    key={item.img} 
                    cols={item.cols || 1} 
                    rows={item.rows || 1} 
                    style={{ cursor: 'pointer'}}
                  >
                      <img 
                          {...srcset(item.img, 121, item.rows, item.cols)} 
                          alt="" 
                      />
                  </ImageListItem>
                ))}
                <ImageListItem>
                  <div style={{
                    display: 'flex',
                    height: 115,
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px dashed rgba(179, 179, 179,0.9)',
                    cursor: 'pointer'
                  }}>
                    <Typography color="GrayText">Xem Ảnh</Typography>
                  </div>
                </ImageListItem>
            </ImageList>
          :
          <ImageList cols={3} rows={3} rowHeight={121} variant="quilted">
                {arrObj && arrObj.slice(0,4).map((item,index) => {
                  if(index === 3) {
                    return (
                      <ImageListItem 
                        key={item.img} 
                        cols={item.cols || 1} 
                        rows={item.rows || 1} 
                        style={{ cursor: 'pointer', position: 'relative' }}
                      >
                          <img 
                              {...srcset(item.img, 121, item.rows, item.cols)} 
                              alt="" 
                          />
                          <Typography style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            color: '#fff',
                            fontWeight: 500,
                            fontSize: '18px',
                          }}>
                            {arrObj.length > 4 && `+${arrObj.length - index}`}
                          </Typography>
                      </ImageListItem>
                    )
                    
                  } 
                  else 
                    return (
                      <ImageListItem 
                        key={item.img} 
                        cols={item.cols || 1} 
                        rows={item.rows || 1} 
                        style={{ cursor: 'pointer'}}
                      >
                          <img 
                              {...srcset(item.img, 121, item.rows, item.cols)} 
                              alt="" 
                          />
                      </ImageListItem>
                    )
                })}
            </ImageList>
        }
        </div>
    )
}

export default ImagesList
