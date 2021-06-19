import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import { Form, Input, Button } from "antd";
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        address: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("이름을 입력해주세요."),
        email: Yup.string().email("이메일 형식이 올바르지 않습니다.").required("이메일을 입력해주세요."),
        password: Yup.string().min(5, "비밀번호는 5자리 이상이어야 합니다.").required("비밀번호를 입력해주세요."),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
          .required("비밀번호를 한번 더 입력해주세요."),
        adress: Yup.string().required("주소를 입력해주세요."),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            adress: values.adress,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const { values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset } = props;
        return (
          <div className="app">
            <h3>회원가입</h3>
            <Form style={{ minWidth: "375px" }} {...formItemLayout} onSubmit={handleSubmit}>
              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름을 입력하세요"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? "text-input error" : "text-input"}
                />
                {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
              </Form.Item>

              

              <Form.Item required label="이메일">
                <Input
                  id="email"
                  placeholder="이메일을 입력해주세요."
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "text-input error" : "text-input"}
                />
                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
              </Form.Item>

              <Form.Item required label="비밀번호">
                <Input
                  id="password"
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.password && touched.password ? "text-input error" : "text-input"}
                />
                {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
              </Form.Item>

              <Form.Item required label="비밀번호 확인">
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.confirmPassword && touched.confirmPassword ? "text-input error" : "text-input"}
                />
                {errors.confirmPassword && touched.confirmPassword && <div className="input-feedback">{errors.confirmPassword}</div>}
              </Form.Item>

              <Form.Item required label="주소">
                <TextArea
                  id="adress"
                  placeholder="주소를 입력하세요"
                  type="text"
                  value={values.adress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.adress && touched.adress ? "text-input error" : "text-input"}
                />
                {errors.adress && touched.adress && <div className="input-feedback">{errors.adress}</div>}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  가입
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
