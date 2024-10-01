import {test, request, expect} from "@playwright/test";

test('POST /api/cars/ - should create a car successfully', async ({ request }) => {
    const authResponse = await request.post('/api/auth/signin', {
      data: {
        "email": "al.kun.055@gmail.com",
        "password": "j3498ojcjc30B",
        "remember": true
      }
    });
    const authBody = await authResponse.json();
    expect(authResponse.status()).toBe(200);
  
    const response = await request.post('/api/cars/', {
      headers: {
        'Authorization': `Bearer ${authBody.token}`
      },
      data: {
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": 122
      }
    });
  
    const responseBody = await response.json();
    expect(response.status()).toBe(201);
    expect(responseBody.status).toBe('ok');
    expect(responseBody.data.carBrandId).toBe(1);
    expect(responseBody.data.carModelId).toBe(1);
    expect(responseBody.data.mileage).toBe(122);
    console.log(responseBody);
  });

test('POST /api/cars/ - should return 400 for missing fields', async ({ request }) => {
    const authResponse = await request.post('/api/auth/signin', {
      data: {
        "email": "al.kun.055@gmail.com",
        "password": "j3498ojcjc30B",
        "remember": true
      }
    });
    const authBody = await authResponse.json();
    expect(authResponse.status()).toBe(200);
    const response = await request.post('/api/cars/', {
      headers: {
        'Authorization': `Bearer ${authBody.token}`
      },
      data: {
        "carBrandId": 1,
        "mileage": 122
      }
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(400);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Cars limit reached');
    console.log(responseBody);
  });
  
  test('POST /api/cars/ - should return 404 when not authenticated', async ({ request }) => {
    const authResponse = await request.post('/api/auth/signin', {
        data: {
          "email": "al.kun.055@gmail.com",
          "password": "j3498ojcjc30B",
          "remember": true
        }
      });
      const authBody = await authResponse.json();
      expect(authResponse.status()).toBe(200);
      const response = await request.post('/api/cars/', {
        headers: {
          'Authorization': `Bearer ${authBody.token}`
        },
        data: {
          "carBrandId": 1,
          "carModelId": 90,
          "mileage": 122
        }
      });
  
    const responseBody = await response.json();
    expect(response.status()).toBe(404);
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Brand not found');
    console.log(responseBody);
  });
