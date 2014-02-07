<?php
$xml_data = <<<XML
<?xml version="1.0" encoding="UTF-8" ?>
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="2.00">
	<NFe xmlns="http://www.portalfiscal.inf.br/nfe">
		<infNFe Id="NFe35130704744013000126550010000252661985351560" versao="2.00">

		<ide>
			<cUF>35</cUF>
			<cNF>98535156</cNF>
			<natOp>VENDA NO ESTADO</natOp>
			<indPag>0</indPag>
			<mod>55</mod>
			<serie>1</serie>
			<nNF>25266</nNF>
			<dEmi>2013-07-08</dEmi>
			<dSaiEnt>2013-07-08</dSaiEnt>
			<tpNF>1</tpNF>
			<cMunFG>3550308</cMunFG>
			<tpImp>1</tpImp>
			<tpEmis>1</tpEmis>
			<cDV>0</cDV>
			<tpAmb>1</tpAmb>
			<finNFe>1</finNFe>
			<procEmi>3</procEmi>
			<verProc>2.0.0.3</verProc>
		</ide>
			
		<emit>
			<CNPJ>04744013000126</CNPJ>
			<xNome>Tecno Malhas Ltda</xNome>
			<enderEmit>
				<xLgr>Rua Baceunas</xLgr>
				<nro>51</nro>
				<xBairro>Vila Prudente</xBairro>
				<cMun>3550308</cMun>
				<xMun>Sao Paulo</xMun>
				<UF>SP</UF>
				<CEP>03127060</CEP>
				<cPais>1058</cPais>
				<xPais>Brasil</xPais>
				<fone>1122743833</fone>
			</enderEmit>
			<IE>116257257110</IE>
			<IM>30729335</IM>
			<CNAE>4641901</CNAE>
			<CRT>3</CRT>
		</emit>

		<dest>
			<CNPJ>11170001000109</CNPJ>
			<xNome>WF DE CARVALHO JR</xNome>
			<enderDest>
				<xLgr>Rua Araruama</xLgr>
				<nro>148</nro>
				<xBairro>Cidade Patriarca</xBairro>
				<cMun>3550308</cMun>
				<xMun>Sao Paulo</xMun>
				<UF>SP</UF>
				<CEP>03555090</CEP>
				<cPais>1058</cPais>
				<xPais>Brasil</xPais>
				<fone>27484455</fone>
			</enderDest>
			<IE>148801031117</IE>
			<email>wesc_oficina@ig.com.br</email>
		</dest>

		<det nItem="1">
			<prod>
				<cProd>353</cProd>
				<cEAN />
				<xProd>Meia Malha Penteada Confort 160 CM 100% CO</xProd>
				<NCM>52083900</NCM>
				<CFOP>5101</CFOP>
				<uCom>KILO</uCom>
				<qCom>77.4600</qCom>
				<vUnCom>20.9034</vUnCom>
				<vProd>1619.18</vProd>
				<cEANTrib />
				<uTrib>KILO</uTrib>
				<qTrib>77.4600</qTrib>
				<vUnTrib>20.9034</vUnTrib>
				<indTot>1</indTot>
			</prod>

			<imposto>
				<ICMS>
					<ICMS20>
						<orig>0</orig>
						<CST>20</CST>
						<modBC>3</modBC>
						<pRedBC>38.89</pRedBC>
						<vBC>629.70</vBC>
						<pICMS>18.00</pICMS>
						<vICMS>113.35</vICMS>
					</ICMS20>
				</ICMS>
				<IPI>
					<cEnq>51</cEnq>
					<IPINT>
						<CST>51</CST>
					</IPINT>
				</IPI>
				<PIS>
					<PISAliq>
						<CST>01</CST>
						<vBC>1619.18</vBC>
						<pPIS>0.65</pPIS>
						<vPIS>10.52</vPIS>
					</PISAliq>
				</PIS>
				<COFINS>
					<COFINSAliq>
						<CST>01</CST>
						<vBC>1619.18</vBC>
						<pCOFINS>3.00</pCOFINS>
						<vCOFINS>48.58</vCOFINS>
					</COFINSAliq>
				</COFINS>
			</imposto>
		</det>

		<total>
			<ICMSTot>
				<vBC>629.70</vBC>
				<vICMS>113.35</vICMS>
				<vBCST>0.00</vBCST>
				<vST>0.00</vST>
				<vProd>1619.18</vProd>
				<vFrete>0.00</vFrete>
				<vSeg>0.00</vSeg>
				<vDesc>0.00</vDesc>
				<vII>0.00</vII>
				<vIPI>0.00</vIPI>
				<vPIS>10.52</vPIS>
				<vCOFINS>48.58</vCOFINS>
				<vOutro>0.00</vOutro>
				<vNF>1619.18</vNF>
			</ICMSTot>
		</total>

		<transp>
			<modFrete>1</modFrete>
			<transporta>
				<CNPJ>11170001000109</CNPJ>
				<xNome>O PROPRIO</xNome>
				<xEnder>Rua Araruama, 148 - Cidade Patriarca</xEnder>
				<xMun>Sao Paulo</xMun>
				<UF>SP</UF>
			</transporta>
			<vol>
				<qVol>7</qVol>
				<esp>VOLUMES</esp>
				<marca>TECIDOS</marca>
				<pesoL>77.460</pesoL>
				<pesoB>77.460</pesoB>
			</vol>
		</transp>

		<infAdic>
			<infCpl>**Atencao** Ao receber os tecidos dessa nota fiscal ... RICMS/00***</infCpl>
			</infAdic>
		</infNFe>

		<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
			<SignedInfo>
				<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />
				<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
				<Reference URI="#NFe35130704744013000126550010000252661985351560">
					<Transforms>
						<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
						<Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />
					</Transforms>
					<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />
					<DigestValue>q8I1qKu3B5w7cDq1QsuRo8rwNhc=</DigestValue>
				</Reference>
			</SignedInfo>
			<SignatureValue>QNpkxbQ3BW ... JaRR4LQ88=</SignatureValue>
			<KeyInfo>
				<X509Data>
					<X509Certificate>MIIGHTCCBQ ... Q+lxs7TAnP</X509Certificate>
				</X509Data>
			</KeyInfo>
		</Signature>
	</NFe>

	<protNFe versao="2.00" xmlns="http://www.portalfiscal.inf.br/nfe">
		<infProt>
			<tpAmb>1</tpAmb>
			<verAplic>SP_NFE_PL_006q</verAplic>
			<chNFe>35130704744013000126550010000252661985351560</chNFe>
			<dhRecbto>2013-07-08T15:25:50</dhRecbto>
			<nProt>135130402290523</nProt>
			<digVal>q8I1qKu3B5w7cDq1QsuRo8rwNhc=</digVal>
			<cStat>100</cStat>
			<xMotivo>Autorizado o uso da NF-e</xMotivo>
		</infProt>
	</protNFe>
</nfeProc>
XML;
?>