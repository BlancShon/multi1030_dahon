package com.multi.dahon.parsing.parsingForm;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class RentHouseLoanOptionParsingForm {
    private String dcls_month;          // 공시 월
    private String fin_co_no;           // 금융 회사 번호
    private String fin_prdt_cd;         // 금융 상품 코드
    private String rpay_type;           // 상환 유형
    private String rpay_type_nm;        // 상환 유형명
    private String lend_rate_type;      // 대출 금리 유형
    private String lend_rate_type_nm;   // 대출 금리 유형명
    private BigDecimal lend_rate_min;       // 최소 대출 금리
    private BigDecimal lend_rate_max;       // 최대 대출 금리
    private BigDecimal lend_rate_avg;       // 평균 대출 금리

}