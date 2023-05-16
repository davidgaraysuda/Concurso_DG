import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './css/LoginPage.css'

const api= 'https://0a7c00af04bc4bb18090174300f300a2.web-security-academy.net/login'

interface LoginData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [background, setBackground] = useState('#ff6633');
  const [image, setImage] = useState('https://pbs.twimg.com/profile_images/1081188968887136256/0KNtPI1U_400x400.jpg');

  
  
  const onFinish = async (values:LoginData) => {
    setLoading(true);
    try {
      const response = await axios.post(api, values);
      const data = response.data;
      
      if (response.status === 200) {
        message.success(data.message);
        setBackground('rgb(0 0 0 / 7');
        setImage('https://cdni.iconscout.com/illustration/premium/thumb/hacker-hacking-website-4357095-3618810.png')

      } else {
        message.error(data.message);
        
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error al intentar iniciar sesión');
      setBackground('rgb(213 17 17 / 78%)');
      setImage('https://thumbs.dreamstime.com/b/ilustraci%C3%B3n-de-vector-concepto-abstracto-error-p%C3%A1gina-web-descarga-del-explorador-plantillas-no-se-encontr%C3%B3-solicitud-servidor-194533600.jpg')
      
    } finally {
      setLoading(false);
    }
  };

  const handleClick= () => {

  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: background }}>
      <div className='login-box' style={{backgroundColor: 'white'}}>
      <h1>Iniciar Sesión</h1>
      <Form 
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: '300px' }}
      >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
      <div className="image-container">
            <img src={image} alt="Imagen de inicio de sesión" />
          </div>
      </div>
    </div>
  );
};

export default LoginForm;
