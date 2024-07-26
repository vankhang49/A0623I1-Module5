import React, { useState } from "react";
import { Formik } from "formik";
import "./App.css";

function App() {
  const SEX_LIST = [{label: 'Nam', value: 'male'}, {label: 'Nữ', value: 'female'}];

  const [form, setForm] = useState({});

  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };

  function handleChange(event) {
    const value = event.target.type === 'checkbox' ? !form[event.target.name] : event.target.value;
    setForm({
      ...form,
      [event.target.name]: value
    });
  }

  function handleValidate() {
    const errors = {};

    if (!form.name) errors.name = "Không được để trống!";

    if (!form.identifier) errors.identifier = "Không được để trống!";

    if (!form.DOB){
      errors.DOB = "Không được để trống!";
    } else if ((form.DOB) <= 1900){
      errors.DOB = "Ngày sinh phải lớn hơn 1900!";
    }

    if (!form.nationality) errors.nationality = "Không được để trống!";

    if (!form.province) errors.province = "Không được để trống!";

    if (!form.district) errors.district = "Không được để trống!";

    if (!form.wards) errors.wards = "Không được để trống!";

    if (!form.street) errors.street = "Không được để trống!";

    if (!form.number) errors.number = "Không được để trống!";

    if (!form.email) {
      errors.email = "Không được để trống!";
    } else if (!REGEX.email.test(form.email)) {
      errors.email = "Invalid email address!";
    }

    return errors;
  }

  function handleSubmit() {
    alert("Send successfully!!!");
  }
  return (
      <div className="container">
        <h1>Tờ khai y tế</h1>
        <Formik initialValues={form} validate={handleValidate} onSubmit={handleSubmit}>
          {({errors, handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <div className={`custom-input ${errors.name ? "custom-input-error" : ""}`}>
                  <label>Họ tên</label>
                  <input type="text" name="name" value={form.name || ""} onChange={handleChange}/>
                  <p className="error">{errors.name}</p>
                </div>

                <div className={`custom-input ${errors.identifier ? "custom-input-error" : ""}`}>
                  <label>Số hộ chiếu/CMND</label>
                  <input type="text" name="identifier" value={form.identifier || ""} onChange={handleChange}/>
                  <p className="error">{errors.identifier}</p>
                </div>

                <div className={`custom-input ${errors.DOB ? "custom-input-error" : ""}`}>
                  <label>Năm sinh</label>
                  <input type="number" name="DOB" value={form.DOB || ""} onChange={handleChange}/>
                  <p className="error">{errors.DOB}</p>
                </div>

                <div className={`custom-input ${errors.gender ? "custom-input-error" : ""}`}>
                  <label className="gender-label">Giới tính</label>
                  <input type="radio" className="gender" name="gender" value={form.gender || "Male"}
                         onChange={handleChange}/> Nam
                  <input type="radio" className="gender" name="gender" value={form.gender || "Female"}
                         onChange={handleChange}/> Nữ
                  <p className="error">{errors.gender}</p>
                </div>

                <div className={`custom-input ${errors.nationality ? "custom-input-error" : ""}`}>
                  <label>Quốc tịch</label>
                  <input type="text" name="nationality" value={form.nationality || ""} onChange={handleChange}/>
                  <p className="error">{errors.nationality}</p>
                </div>

                <div className={`custom-input ${errors.workplace ? "custom-input-error" : ""}`}>
                  <label>Công ty làm việc</label>
                  <input type="text" name="workplace" value={form.workplace || ""} onChange={handleChange}/>
                  <p className="error">{errors.workplace}</p>
                </div>

                <div className={`custom-input ${errors.department ? "custom-input-error" : ""}`}>
                  <label>Bộ phận làm việc</label>
                  <input type="text" name="department" value={form.department || ""} onChange={handleChange}/>
                  <p className="error">{errors.department}</p>
                </div>

                <div className={`custom-input ${errors.healthInsurance ? "custom-input-error" : ""}`}>
                  <label className="heal-label">Có thẻ bảo hiểm y tế </label>
                  <input className="heal-checkbox" type="checkbox" name="healthInsurance"
                         value={form.healthInsurance || true}
                         onChange={handleChange}/>
                  <p className="error">{errors.healthInsurance}</p>
                </div>

                <h2>Địa chỉ liên lạc tại Việt Nam</h2>
                <div className={`custom-input ${errors.province ? "custom-input-error" : ""}`}>
                  <label>Tỉnh thành</label>
                  <input type="text" name="province" value={form.province || ""} onChange={handleChange}/>
                  <p className="error">{errors.province}</p>
                </div>

                <div className={`custom-input ${errors.district ? "custom-input-error" : ""}`}>
                  <label>Quận huyện</label>
                  <input type="text" name="district" value={form.district || ""} onChange={handleChange}/>
                  <p className="error">{errors.district}</p>
                </div>

                <div className={`custom-input ${errors.wards ? "custom-input-error" : ""}`}>
                  <label>Phường xã</label>
                  <input type="text" name="wards" value={form.wards || ""} onChange={handleChange}/>
                  <p className="error">{errors.wards}</p>
                </div>

                <div className={`custom-input ${errors.street ? "custom-input-error" : ""}`}>
                  <label>Số nhà, phố, tổ dân phố/thôn/đội</label>
                  <input type="text" name="street" value={form.street || ""} onChange={handleChange}/>
                  <p className="error">{errors.street}</p>
                </div>

                <div className={`custom-input ${errors.number ? "custom-input-error" : ""}`}>
                  <label>Điện thoại</label>
                  <input type="text" name="number" value={form.number || ""} onChange={handleChange}/>
                  <p className="error">{errors.number}</p>
                </div>

                <div className={`custom-input ${errors.email ? "custom-input-error" : ""}`}>
                  <label>Email</label>
                  <input type="email" name="email" value={form.email || ""} onChange={handleChange}/>
                  <p className="error">{errors.email}</p>
                </div>

                <h2>Trong vòng 14 ngày qua, Anh/Chị có đến quốc gia/vùng lãnh thổ nào (Có thể đi qua nhiều quốc
                  gia)</h2>
                <div className={`custom-input`}>
                  <input type="text" name="travel" value="" onChange={handleChange}/>
                </div>

                <h2>Trong vòng 14 ngày qua, Anh/Chị có xuất hiện dấu hiệu nào sau đây không?</h2>
                <div className={`custom-input`}>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="Sốt" onChange={handleChange}/> Sốt
                  </label>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="Ho" onChange={handleChange}/> Ho
                  </label>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="Khó thở" onChange={handleChange}/> Khó thở
                  </label>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="Viêm phổi" onChange={handleChange}/> Viêm phổi
                  </label>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="Đau họng" onChange={handleChange}/> Đau họng
                  </label>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="Mệt mỏi" onChange={handleChange}/> Mệt mỏi
                  </label>
                </div>

                <h2>Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với?</h2>
                <div className={`custom-input`}>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="patient" onChange={handleChange}/> Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19
                  </label>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="people coming from places with epidemics" onChange={handleChange}/> Người từ nước có
                    bệnh COVID-19
                  </label>
                  <label className="info-label">
                    <input className="info-checkbox" type="checkbox" name="signal" value="people with symptoms" onChange={handleChange}/> Người có biểu hiện (Sốt, ho, khó thở, viêm họng)
                  </label>
                </div>

                <div className="btn-submit">
                  <button className="submit" type="submit">Gửi</button>
                </div>
              </form>
          )}
        </Formik>
      </div>
  );
}

export default App;